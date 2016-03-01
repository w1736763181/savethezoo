package com.sap.mi.innovation.wrapper;

import com.sap.mi.innovation.model.IdeaEntity;
import com.sap.mi.innovation.model.ProjectEntity;

import javax.persistence.*;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by I309891 on 2/18/2016.
 */
public class ProjectModel {
    private ProjectEntity projectEntity = new ProjectEntity();
    private List<String> image = new ArrayList<String>();
    private List<Integer> member = new ArrayList<Integer>();

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd");

    public Integer getId() {
        return projectEntity.getId();
    }

    public void setId(Integer id) {
        projectEntity.setId(id);
    }

    public String getTitle() {
        return projectEntity.getTitle();
    }

    public void setTitle(String title) {
        projectEntity.setTitle(title);
    }

    public String getDescription() {
        return projectEntity.getDescription();
    }

    public void setDescription(String description) {
        projectEntity.setDescription(description);
    }

    public String getStartdate() {
        return dateFormat.format(projectEntity.getStartdate());
    }

    public void setStartdate(String fromdate) {
        this.projectEntity.setStartdate(Date.valueOf(fromdate.replace(".", "-")));
    }

    public String getTodate() {
        return dateFormat.format(projectEntity.getTodate());
    }

    public void setTodate(String todate) {
        this.projectEntity.setTodate(Date.valueOf(todate.replace(".", "-")));
    }

    public String getCreatedate() {
        return dateFormat.format(this.projectEntity.getCreateDate());
    }

    public void setCreatedate(String createddate) {
        this.projectEntity.setCreateDate(Date.valueOf(createddate.replace(".", "-")));
    }

    public Integer getStatus() {
        return projectEntity.getStatus();
    }

    public void setStatus(Integer status) {
        projectEntity.setStatus(status);
    }

    public Integer getLikes() {
        return projectEntity.getLikes();
    }

    public void setLikes(Integer likes) {
        projectEntity.setLikes(likes);
    }

    public Integer getImagenum() {
        return projectEntity.getImagenum();
    }

    public void setImagenum(Integer imagenum) {
        projectEntity.setImagenum(imagenum);
    }

    public ProjectEntity getProjectEntity() {
        return projectEntity;
    }

    public void setProjectEntity(ProjectEntity projectEntity) {
        this.projectEntity = projectEntity;
    }

    public List<String> getImage() {
        return image;
    }

    public void setImage(List<String> image) {
        this.image = image;
    }

    public List<Integer> getMember() {
        return member;
    }

    public void setMember(List<Integer> member) {
        this.member = member;
    }

    public Integer getUid() {
        return projectEntity.getUid();
    }

    public void setUid(Integer uid) {
        this.projectEntity.setUid(uid);
    }

    public String getCategory() {
        return projectEntity.getCategory();
    }

    public void setCategory(String cid) {
        this.projectEntity.setCategory(cid);
    }
}
