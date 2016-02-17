package com.sap.mi.innovation.controller;

import com.sap.mi.innovation.model.CategoryEntity;
import com.sap.mi.innovation.model.IdeaEntity;
import com.sap.mi.innovation.repository.CategoryRepository;
import com.sap.mi.innovation.repository.IVotingRepository;
import com.sap.mi.innovation.repository.IdeaRepository;
import com.sap.mi.innovation.wrapper.IdeaModel;
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
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by I309891 on 1/12/2016.
 */
@RestController
@RequestMapping(value = "idea")
public class IdeaController {
    // 自动装配
    @Autowired
    private IdeaRepository ideaRepository;
    //@Autowired
  //  private IVotingRepository iVotingRepository;
    @PersistenceUnit
    private EntityManagerFactory emf;

    private List<IdeaModel> ideaModelList = new ArrayList<IdeaModel>();

    private CategoryController categoryController;
    // 用户管理
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<IdeaModel>> getAllIdeas(@RequestParam(value = "uid", required = false) int uid) {
        EntityManager em = emf.createEntityManager();
        String sql = "SELECT idea.id,idea.uid,idea.title,idea.description,idea.likes,users.firstname,ideaid,category.images as image,idea.images,createdate FROM idea LEFT JOIN (select * from i_voting where i_voting.uid = ?) AS voting ON idea.id = voting.ideaid left join users on idea.uid = users.id LEFT JOIN category on idea.category = category.animal";
        Query ideaQuery = em.createNativeQuery(sql);
        ideaQuery.setParameter(1,uid);
        List<Object[]> resultList = ideaQuery.getResultList();
      //  List<IdeaModel> ideaModelList = new ArrayList<IdeaModel>();
        for(int i =0;i<resultList.size();i++) {
            IdeaModel im = new IdeaModel();
            im.setId((Integer)(resultList.get(i)[0]));
            im.setUid((Integer)(resultList.get(i)[1]));
            im.setTitle((String)(resultList.get(i)[2]));
            im.setDescription((String)(resultList.get(i)[3]));
            im.setLikes((Integer)(resultList.get(i)[4]));
            im.setFirstname((String)(resultList.get(i)[5]));
            im.setIdeaid((Integer)(resultList.get(i)[6]));
            im.setCategoryImage((String)(resultList.get(i)[7]));
            im.setImages((Integer)(resultList.get(i)[8]));
            im.setCreatedate((String)(resultList.get(i)[9]));
            ideaModelList.add(im);
        }
        return ResponseEntity.ok(ideaModelList);
    }


    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> create(@RequestParam(value = "image", required = false) MultipartFile[] uploadImage,
                                             @RequestParam(value = "uid", required = false) int uid,
                                             @RequestParam(value = "category", required = false) String category,
                                             @RequestParam(value = "title", required = false) String title,
                                             @RequestParam(value = "description", required = false) String description,
                                             @RequestParam(value = "businessImpact", required = false) String businessImpact)
            throws IOException{
        IdeaEntity idea = new IdeaEntity();
        idea.setUid(uid);
        idea.setCategory(category);
        idea.setTitle(title);
        idea.setDiscription(description);
        idea.setBusinessImpact(businessImpact);
        idea.setCreateDate(new java.sql.Date(new java.util.Date().getTime()));
        int imageNum = uploadImage.length;
        idea.setImages(imageNum);
        IdeaEntity savedIdea;
        try {
            savedIdea = ideaRepository.saveAndFlush(idea);
        }catch(Exception e){
            e.printStackTrace();
            Logger logger = Logger.getLogger(UserController.class);
            logger.error(e.getMessage());
            return new ResponseEntity<String>(HttpStatus.EXPECTATION_FAILED);
        }
        String ps = File.separator;
//        String ideaDirPath = System.getProperty("user.home")+ps+"IdeaProjects"+ps+"innovation_zoo"+ps+"src"+ps+"main"+ps+"uploadedImage"+ps+"idea"+ps+savedIdea.getId();
        String ideaDirPath = "\\uploadImage\\idea\\"+savedIdea.getId();
        System.out.println(ideaDirPath);
        File ideaDir = new File(ideaDirPath);
        if(!ideaDir.exists())
            ideaDir.mkdirs();
        for(int i = 0; i < uploadImage.length;i++) {
            BufferedImage src = ImageIO.read(new ByteArrayInputStream(uploadImage[i].getBytes()));
            File destination = new File(ideaDirPath + ps + i + ".png");
            if (!destination.exists())
                destination.createNewFile();
            ImageIO.write(src, "png", destination);
        }
        System.out.println(ideaDir.listFiles()[0]);
        return ResponseEntity.ok("Idea created successfully");
    }

    @RequestMapping(value="/create", method = RequestMethod.POST)
    public ResponseEntity<IdeaEntity> createIdea(@RequestParam(value = "image", required = false) MultipartFile[] uploadImage,
                                                 @RequestParam(value = "uid", required = false) int uid,
                                                 @RequestParam(value = "category", required = false) String category,
                                                 @RequestParam(value = "title", required = false) String title,
                                                 @RequestParam(value = "description", required = false) String description,
                                                 @RequestParam(value = "businessImpact", required = false) String businessImpact) {

        IdeaEntity idea = new IdeaEntity();
        idea.setUid(uid);
        idea.setCategory(category);
        idea.setTitle(title);
        idea.setDiscription(description);
        idea.setBusinessImpact(businessImpact);
        int imageNum = uploadImage.length;
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

        String ideaDirPath = "img\\idea\\"+savedIdea.getId();
        System.out.println(ideaDirPath);
        File ideaDir = new File(ideaDirPath);
        if(!ideaDir.exists())
            ideaDir.mkdirs();
        for(int i = 0; i < uploadImage.length;i++) {
            try {
                BufferedImage src = ImageIO.read(new ByteArrayInputStream(uploadImage[i].getBytes()));
                File destination = new File(ideaDirPath + File.pathSeparator + i + ".png");
                if (!destination.exists())
                    destination.createNewFile();
                ImageIO.write(src, "png", destination);
            }catch(IOException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity(savedIdea, HttpStatus.OK);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public ResponseEntity<IdeaModel> getIdeasById(@PathVariable int id) {
        for(IdeaModel im: ideaModelList) {
            if(im.getId() == id) {
                return ResponseEntity.ok(im);
            }
        }
        return null;

    }

}
