package com.sap.mi.innovation.controller;

import com.sap.mi.innovation.model.*;
import com.sap.mi.innovation.repository.*;
import com.sap.mi.innovation.utils.ImageUtils;
import com.sap.mi.innovation.wrapper.IdeaImage;
import com.sap.mi.innovation.wrapper.IdeaModel;
import com.sap.mi.innovation.wrapper.ProjectModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.servlet.ServletContext;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by I309891 on 1/12/2016.
 */
@RestController
@RequestMapping(value = "idea")
public class IdeaController {

    public static final String IDEA_BASE = "img" + File.separator + "idea" + File.separator;
    public static final String PROJECT_BASE = "img" + File.separator + "project" + File.separator;

    @Autowired
    private IdeaRepository ideaRepository;
    @Autowired
    private IVotingRepository iVotingRepository;
    @Autowired
    private ServletContext servletContext;

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectGroupRepository projectGroupRepository;
    @Autowired
    private ICommentRepository iCommentRepository;

    @PersistenceUnit
    private EntityManagerFactory emf;

    // 用户管理
    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<List<IdeaModel>> getAllIdeas(@RequestBody UsersEntity usersEntity) {
        EntityManager em = emf.createEntityManager();
        String sql = "SELECT idea.id,idea.uid,idea.title,idea.description, idea.likes," +
                "users.firstname,ideaid,cate.image as image,idea.images,createdate, idea.businessImpact, " +
                "users.lastname, idea.status, idea.category, idea.pid " +
                "FROM idea LEFT JOIN (select * from i_voting where i_voting.uid = ?) AS voting ON idea.id = voting.ideaid " +
                "left join users on idea.uid = users.id " +
                "LEFT JOIN (SELECT * FROM category WHERE status = 1) AS cate on idea.category = cate.animal ORDER BY LIKES DESC";
        Query ideaQuery = em.createNativeQuery(sql);
        ideaQuery.setParameter(1, usersEntity.getId());
        List<Object[]> resultList = ideaQuery.getResultList();
        List<IdeaModel> ideaModelList = new ArrayList<IdeaModel>();
        for(int i =0;i<resultList.size();i++) {
            IdeaModel im = new IdeaModel();
            im.setId((Integer)(resultList.get(i)[0]));
            im.setUid((Integer)(resultList.get(i)[1]));
            im.setTitle((String)(resultList.get(i)[2]));
            im.setDescription((String)(resultList.get(i)[3]));
            im.setLikes((Integer)(resultList.get(i)[4]));
            im.setFirstname((String)(resultList.get(i)[5]));
            im.setVoting((Integer)(resultList.get(i)[6]));
            im.setCategoryImage((String)(resultList.get(i)[7]));
            im.setImages((Integer)(resultList.get(i)[8]));
            im.setCreatedate((java.sql.Date)(resultList.get(i)[9]));
            im.setBusinessImpact((String)(resultList.get(i)[10]));
            im.setLastname((String)(resultList.get(i)[11]));
            im.setStatus((Integer)(resultList.get(i)[12]));
            im.setCategory((String)(resultList.get(i)[13]));
            im.setPid((Integer)(resultList.get(i)[14]));
            ideaModelList.add(im);
        }
        return ResponseEntity.ok(ideaModelList);
    }


    // 用户管理
    @RequestMapping(value = "/me", method = RequestMethod.POST)
    public ResponseEntity<List<IdeaModel>> getMyIdeas(@RequestBody UsersEntity usersEntity) {
        EntityManager em = emf.createEntityManager();
        String sql = "SELECT idea.id,idea.uid,idea.title,idea.description, idea.likes," +
                "users.firstname,ideaid,cate.image as image,idea.images,createdate, idea.businessImpact, " +
                "users.lastname, idea.status, idea.category, idea.pid " +
                "FROM idea LEFT JOIN (select * from i_voting where i_voting.uid = ?) AS voting ON idea.id = voting.ideaid " +
                "left join users on idea.uid = users.id " +
                "LEFT JOIN (SELECT * FROM category WHERE status = 1) AS cate on idea.category = cate.animal " +
                "WHERE idea.uid = ? ORDER BY LIKES DESC";
        Query ideaQuery = em.createNativeQuery(sql);
        ideaQuery.setParameter(1, usersEntity.getId());
        ideaQuery.setParameter(2, usersEntity.getId());
        List<Object[]> resultList = ideaQuery.getResultList();
        List<IdeaModel> ideaModelList = new ArrayList<IdeaModel>();
        for(int i =0;i<resultList.size();i++) {
            IdeaModel im = new IdeaModel();
            im.setId((Integer)(resultList.get(i)[0]));
            im.setUid((Integer)(resultList.get(i)[1]));
            im.setTitle((String)(resultList.get(i)[2]));
            im.setDescription((String)(resultList.get(i)[3]));
            im.setLikes((Integer)(resultList.get(i)[4]));
            im.setFirstname((String)(resultList.get(i)[5]));
            im.setVoting((Integer)(resultList.get(i)[6]));
            im.setCategoryImage((String)(resultList.get(i)[7]));
            im.setImages((Integer)(resultList.get(i)[8]));
            im.setCreatedate((java.sql.Date)(resultList.get(i)[9]));
            im.setBusinessImpact((String)(resultList.get(i)[10]));
            im.setLastname((String)(resultList.get(i)[11]));
            im.setStatus((Integer)(resultList.get(i)[12]));
            im.setCategory((String)(resultList.get(i)[13]));
            im.setPid((Integer)(resultList.get(i)[14]));
            ideaModelList.add(im);
        }
        return ResponseEntity.ok(ideaModelList);
    }


    @RequestMapping(value="/create", method = RequestMethod.POST)
    public ResponseEntity<IdeaEntity> createIdea(@RequestBody IdeaImage ideaImage) {

        IdeaEntity idea = ideaImage.getIdeaEntity();
        idea.setCreateDate(new java.sql.Date(new java.util.Date().getTime()));
        int imageNum = ideaImage.getImage().size();
        List<String> uploadImg = ideaImage.getImage();
        idea.setImages(imageNum);
        IdeaEntity savedIdea;
        try {
            savedIdea = ideaRepository.saveAndFlush(idea);
        }catch(Exception e){
            e.printStackTrace();
            Logger logger = Logger.getLogger(UserController.class);
            logger.error(e.getMessage());
            return new ResponseEntity<IdeaEntity>(HttpStatus.EXPECTATION_FAILED);
        }

        String ideaDirPath = servletContext.getRealPath("/") + IDEA_BASE + savedIdea.getId();
        File ideaDir = new File(ideaDirPath);
        if(!ideaDir.exists())
            ideaDir.mkdirs();
        for(int i = 0; i < uploadImg.size();i++) {
            String image = uploadImg.get(i);
            try {
                image = image.replaceFirst("^data:image/[^;]*;base64,?","");
                BufferedImage file = ImageUtils.decodeToImage(image);
                File destination = new File(ideaDirPath + File.separator + i + ".png");
                ImageIO.write(file, "png", destination);
            }catch(IOException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity(savedIdea, HttpStatus.OK);
    }


    // 用户管理
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ResponseEntity<IdeaModel> getIdea(@PathVariable int id, @RequestBody UsersEntity usersEntity) {
        // 返回 pages 目录下的 userManage.jsp 页面
        EntityManager em = emf.createEntityManager();
        String sql = "SELECT idea.id,idea.uid,idea.title,idea.description,idea.likes," +
                "                users.firstname,ideaid,cate.image as image,idea.images," +
                "                createdate, idea.businessImpact, users.lastname, idea.status, idea.category, idea.pid " +
                "                FROM idea LEFT JOIN (select * from i_voting where i_voting.uid = ?) AS voting ON idea.id = voting.ideaid " +
                "                left join users on idea.uid = users.id" +
                "                LEFT JOIN (SELECT * FROM category WHERE status = 1) AS cate on idea.category = cate.animal where idea.id = ?";
        Query ideaQuery = em.createNativeQuery(sql);
        ideaQuery.setParameter(1, usersEntity.getId());
        ideaQuery.setParameter(2, id);
        List<Object[]> resultList = ideaQuery.getResultList();
        IdeaModel ideaModel = new IdeaModel();
        if(resultList.size() > 0) {
            ideaModel.setId((Integer)(resultList.get(0)[0]));
            ideaModel.setUid((Integer)(resultList.get(0)[1]));
            ideaModel.setTitle((String)(resultList.get(0)[2]));
            ideaModel.setDescription((String)(resultList.get(0)[3]));
            ideaModel.setLikes((Integer)(resultList.get(0)[4]));
            ideaModel.setFirstname((String)(resultList.get(0)[5]));
            ideaModel.setVoting((Integer)(resultList.get(0)[6]));
            ideaModel.setCategoryImage((String)(resultList.get(0)[7]));
            ideaModel.setImages((Integer)(resultList.get(0)[8]));
            ideaModel.setCreatedate((java.sql.Date)(resultList.get(0)[9]));
            ideaModel.setBusinessImpact((String)(resultList.get(0)[10]));
            ideaModel.setLastname((String)(resultList.get(0)[11]));
            ideaModel.setStatus((Integer)(resultList.get(0)[12]));
            ideaModel.setCategory((String)(resultList.get(0)[13]));
            ideaModel.setPid((Integer)(resultList.get(0)[14]));
        }
        return new ResponseEntity<IdeaModel>(ideaModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/voting", method = RequestMethod.POST)
    public ResponseEntity<IVotingEntity> voting(@RequestBody IVotingEntity votingEntity) {
        iVotingRepository.saveAndFlush(votingEntity);
        ideaRepository.voting(votingEntity.getIdeaid());
        return new ResponseEntity<IVotingEntity>(votingEntity, HttpStatus.OK);
    }

    @RequestMapping(value = "/approve", method = RequestMethod.POST)
    public ResponseEntity<IdeaModel> approve(@RequestBody IdeaModel ideaModel) {
        ideaRepository.approve(ideaModel.getId());
        return new ResponseEntity<IdeaModel>(ideaModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/comment", method = RequestMethod.POST)
    public ResponseEntity<ICommentEntity> comment(@RequestBody ICommentEntity iCommentEntity) {
        ICommentEntity result = iCommentRepository.saveAndFlush(iCommentEntity);
        return new ResponseEntity<ICommentEntity>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/comment", method = RequestMethod.GET)
    public ResponseEntity<List<ICommentEntity>> getComments(@PathVariable int id) {
        List<ICommentEntity> result = iCommentRepository.findByIdeaid(id);
        return new ResponseEntity<List<ICommentEntity>>(result, HttpStatus.OK);
    }



    @RequestMapping(value = "/generate/{id}", method = RequestMethod.POST)
    public ResponseEntity<ProjectEntity> generateProject(@PathVariable int id, @RequestBody ProjectModel projectModel) {
        ProjectEntity project = projectModel.getProjectEntity();
        project.setCreateDate(new java.sql.Date(new java.util.Date().getTime()));
        project.setLikes(0);
        int imageNum = projectModel.getImage().size();
        List<String> uploadImg = projectModel.getImage();
        project.setImagenum(imageNum);
        ProjectEntity savedProject;
        try {
            savedProject = projectRepository.saveAndFlush(project);
        }catch(Exception e){
            e.printStackTrace();
            Logger logger = Logger.getLogger(UserController.class);
            logger.error(e.getMessage());
            return new ResponseEntity<ProjectEntity>(HttpStatus.EXPECTATION_FAILED);
        }

        String projectDirPath = servletContext.getRealPath("/") + PROJECT_BASE + savedProject.getId();
        File projectDir = new File(projectDirPath);
        if(!projectDir.exists())
            projectDir.mkdirs();
        for(int i = 0; i < uploadImg.size();i++) {
            String image = uploadImg.get(i);
            try {
                image = image.replaceFirst("^data:image/[^;]*;base64,?","");
                BufferedImage file = ImageUtils.decodeToImage(image);
                File destination = new File(projectDirPath + File.separator + i + ".png");
                ImageIO.write(file, "png", destination);
            }catch(IOException e) {
                e.printStackTrace();
            }
        }

        ProjectgroupEntity projectgroupEntity = new ProjectgroupEntity();
        projectgroupEntity.setUid(savedProject.getUid());
        projectgroupEntity.setJob(1);
        projectgroupEntity.setPid(savedProject.getId());
        projectGroupRepository.save(projectgroupEntity);

        for(int i : projectModel.getMember()) {
            ProjectgroupEntity temp = new ProjectgroupEntity();
            temp.setUid(i);
            temp.setJob(0);
            temp.setPid(savedProject.getId());
            projectGroupRepository.save(temp);
        }

        projectGroupRepository.flush();

        ideaRepository.generateProject(savedProject.getId(), id);

        return new ResponseEntity<ProjectEntity>(savedProject, HttpStatus.OK);
    }

}
