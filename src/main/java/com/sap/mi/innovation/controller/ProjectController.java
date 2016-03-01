package com.sap.mi.innovation.controller;

import com.sap.mi.innovation.model.*;
import com.sap.mi.innovation.repository.*;
import com.sap.mi.innovation.wrapper.IdeaModel;
import com.sap.mi.innovation.wrapper.ProjectListModel;
import com.sap.mi.innovation.wrapper.ProjectModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.servlet.ServletContext;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by I309891 on 1/12/2016.
 */
@RestController
@RequestMapping(value = "project")
public class ProjectController {

    @Autowired
    private ServletContext servletContext;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private PVotingRepository pVotingRepository;

    @Autowired
    private PCommentRepository pCommentRepository;

    @Autowired
    private ProjectGroupRepository projectGroupRepository;


    @PersistenceUnit
    private EntityManagerFactory emf;


    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<List<ProjectListModel>> getAllProjects(@RequestBody UsersEntity usersEntity) {
        EntityManager em = emf.createEntityManager();
        String sql = "SELECT project.id,project.uid, project.title,project.description, project.likes, " +
                "                users.firstname, voting.id as vote , cate.image as image, project.imagenum, project.createDate, project.startdate, " +
                "                project.todate, " +
                "                users.lastname, project.status, project.category " +
                "                FROM project LEFT JOIN (select * from p_voting where p_voting.uid = ?) AS voting ON project.id = voting.pid " +
                "                left join users on project.uid = users.id " +
                "                LEFT JOIN (SELECT * FROM category) AS cate on project.category = cate.animal and cate.status = project.status + 1 ORDER BY LIKES DESC";
        Query ideaQuery = em.createNativeQuery(sql);
        ideaQuery.setParameter(1, usersEntity.getId());
        List<Object[]> resultList = ideaQuery.getResultList();
        List<ProjectListModel> projectModelList = new ArrayList<ProjectListModel>();
        for(int i =0;i<resultList.size();i++) {
            ProjectListModel im = new ProjectListModel();
            im.setId((Integer)(resultList.get(i)[0]));
            im.setUid((Integer)(resultList.get(i)[1]));
            im.setTitle((String)(resultList.get(i)[2]));
            im.setDescription((String)(resultList.get(i)[3]));
            im.setLikes((Integer)(resultList.get(i)[4]));
            im.setFirstname((String)(resultList.get(i)[5]));
            im.setVoting((Integer)(resultList.get(i)[6]));
            im.setCategoryImage((String)(resultList.get(i)[7]));
            im.setImages((Integer)(resultList.get(i)[8]));
            im.setCreateDate((java.sql.Date)(resultList.get(i)[9]));
            im.setStartDate((java.sql.Date)(resultList.get(i)[10]));
            im.setToDate((java.sql.Date)(resultList.get(i)[11]));
            im.setLastname((String)(resultList.get(i)[12]));
            im.setStatus((Integer)(resultList.get(i)[13]));
            im.setCategory((String)(resultList.get(i)[14]));
            projectModelList.add(im);
        }
        return ResponseEntity.ok(projectModelList);
    }

    @RequestMapping(value = "/me", method = RequestMethod.POST)
    public ResponseEntity<List<ProjectListModel>> getMyProjects(@RequestBody UsersEntity usersEntity) {
        EntityManager em = emf.createEntityManager();
        String sql = "SELECT project.id,project.uid, project.title,project.description, project.likes, " +
                "                users.firstname, voting.id as vote , cate.image as image, project.imagenum, project.createDate, project.startdate, " +
                "                project.todate, " +
                "                users.lastname, project.status, project.category " +
                "                FROM project LEFT JOIN (select * from p_voting where p_voting.uid = ?) AS voting ON project.id = voting.pid " +
                "                left join users on project.uid = users.id " +
                "                LEFT JOIN (SELECT * FROM category) AS cate on project.category = cate.animal and cate.status = project.status + 1 " +
                "                WHERE project.uid = ? ORDER BY LIKES DESC";
        Query ideaQuery = em.createNativeQuery(sql);
        ideaQuery.setParameter(1, usersEntity.getId());
        ideaQuery.setParameter(2, usersEntity.getId());
        List<Object[]> resultList = ideaQuery.getResultList();
        List<ProjectListModel> projectModelList = new ArrayList<ProjectListModel>();
        for(int i =0;i<resultList.size();i++) {
            ProjectListModel im = new ProjectListModel();
            im.setId((Integer)(resultList.get(i)[0]));
            im.setUid((Integer)(resultList.get(i)[1]));
            im.setTitle((String)(resultList.get(i)[2]));
            im.setDescription((String)(resultList.get(i)[3]));
            im.setLikes((Integer)(resultList.get(i)[4]));
            im.setFirstname((String)(resultList.get(i)[5]));
            im.setVoting((Integer)(resultList.get(i)[6]));
            im.setCategoryImage((String)(resultList.get(i)[7]));
            im.setImages((Integer)(resultList.get(i)[8]));
            im.setCreateDate((java.sql.Date)(resultList.get(i)[9]));
            im.setStartDate((java.sql.Date)(resultList.get(i)[10]));
            im.setToDate((java.sql.Date)(resultList.get(i)[11]));
            im.setLastname((String)(resultList.get(i)[12]));
            im.setStatus((Integer)(resultList.get(i)[13]));
            im.setCategory((String)(resultList.get(i)[14]));
            projectModelList.add(im);
        }
        return ResponseEntity.ok(projectModelList);
    }


    @RequestMapping(value = "/comment", method = RequestMethod.POST)
    public ResponseEntity<PCommentEntity> comment(@RequestBody PCommentEntity pCommentEntity) {
        PCommentEntity result = pCommentRepository.saveAndFlush(pCommentEntity);
        return new ResponseEntity<PCommentEntity>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/comment", method = RequestMethod.GET)
    public ResponseEntity<List<PCommentEntity>> getComments(@PathVariable int id) {
        List<PCommentEntity> result = pCommentRepository.findByPid(id);
        return new ResponseEntity<List<PCommentEntity>>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/member", method = RequestMethod.GET)
    public ResponseEntity<List<UsersEntity>> getMembers(@PathVariable int id) {
        EntityManager em = emf.createEntityManager();
        String sql = "SELECT users.id, users.firstname, users.lastname, users.head, " +
                "users.authentication, users.coin, users.email," +
                "users.department, users.phone, users.password " +
                " FROM users, projectgroup WHERE pid = ? AND uid = users.id;";
        Query ideaQuery = em.createNativeQuery(sql, UsersEntity.class);
        ideaQuery.setParameter(1, id);
        List<UsersEntity> resultList = ideaQuery.getResultList();
        return ResponseEntity.ok(resultList);
    }

    @RequestMapping(value = "/updateSatus", method = RequestMethod.POST)
    public ResponseEntity<ProjectListModel>  updateStauts(@RequestBody ProjectListModel plModel) {
        projectRepository.setStatus(plModel.getStatus(), plModel.getId());
        return new ResponseEntity<ProjectListModel>(plModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ResponseEntity<ProjectListModel> getProject(@PathVariable int id, @RequestBody UsersEntity usersEntity) {
        // 返回 pages 目录下的 userManage.jsp 页面
        EntityManager em = emf.createEntityManager();
        String sql = "SELECT project.id,project.uid, project.title,project.description, project.likes, " +
                "                users.firstname, voting.id as vote , cate.image as image, project.imagenum, project.createDate, project.startdate, " +
                "                project.todate, " +
                "                users.lastname, project.status, project.category " +
                "                FROM project LEFT JOIN (select * from p_voting where p_voting.uid = ?) AS voting ON project.id = voting.pid " +
                "                left join users on project.uid = users.id " +
                "                LEFT JOIN (SELECT * FROM category) AS cate on project.category = cate.animal and cate.status = project.status + 1 WHERE project.id = ? ORDER BY LIKES DESC";
        Query projectQuery = em.createNativeQuery(sql);
        projectQuery.setParameter(1, usersEntity.getId());
        projectQuery.setParameter(2, id);
        List<Object[]> resultList = projectQuery.getResultList();
        ProjectListModel projectModel = new ProjectListModel();
        if(resultList.size() > 0) {
            projectModel.setId((Integer)(resultList.get(0)[0]));
            projectModel.setUid((Integer)(resultList.get(0)[1]));
            projectModel.setTitle((String)(resultList.get(0)[2]));
            projectModel.setDescription((String)(resultList.get(0)[3]));
            projectModel.setLikes((Integer)(resultList.get(0)[4]));
            projectModel.setFirstname((String)(resultList.get(0)[5]));
            projectModel.setVoting((Integer)(resultList.get(0)[6]));
            projectModel.setCategoryImage((String)(resultList.get(0)[7]));
            projectModel.setImages((Integer)(resultList.get(0)[8]));
            projectModel.setCreateDate((java.sql.Date)(resultList.get(0)[9]));
            projectModel.setStartDate((java.sql.Date)(resultList.get(0)[10]));
            projectModel.setToDate((java.sql.Date)(resultList.get(0)[11]));
            projectModel.setLastname((String)(resultList.get(0)[12]));
            projectModel.setStatus((Integer)(resultList.get(0)[13]));
            projectModel.setCategory((String)(resultList.get(0)[14]));
        }
        return new ResponseEntity<ProjectListModel>(projectModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/voting", method = RequestMethod.POST)
    public ResponseEntity<PVotingEntity> voting(@RequestBody PVotingEntity votingEntity) {
        pVotingRepository.saveAndFlush(votingEntity);
        projectRepository.voting(votingEntity.getPid());
        return new ResponseEntity<PVotingEntity>(votingEntity, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/addMember", method = RequestMethod.POST)
    public ResponseEntity<String> generateProject(@PathVariable int id, @RequestBody ProjectModel projectModel) {

        for(int i : projectModel.getMember()) {
            ProjectgroupEntity temp = new ProjectgroupEntity();
            temp.setUid(i);
            temp.setJob(0);
            temp.setPid(id);
            projectGroupRepository.save(temp);
        }

        projectGroupRepository.flush();

        return new ResponseEntity<String>("Add success!", HttpStatus.OK);
    }

}
