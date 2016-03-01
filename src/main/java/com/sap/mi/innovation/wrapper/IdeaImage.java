package com.sap.mi.innovation.wrapper;

import com.sap.mi.innovation.model.IdeaEntity;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by I309891 on 2/16/2016.
 */
public class IdeaImage {
    private IdeaEntity  ideaEntity = new IdeaEntity();
    private List<String> image = new ArrayList<String>();


    public Integer getId() {
        return ideaEntity.getId();
    }

    public void setId(Integer id) {
        ideaEntity.setId(id);
    }

    public Integer getUid() {
        return ideaEntity.getUid();
    }

    public void setUid(Integer uid) {
        this.ideaEntity.setUid(uid);
    }


    public String getCategory() {
        return ideaEntity.getCategory();
    }

    public void setCategory(String category) {
        this.ideaEntity.setCategory(category);
    }

    public String getTitle() {
        return this.ideaEntity.getTitle();
    }

    public void setTitle(String title) {
        this.ideaEntity.setTitle(title);
    }

    public Integer getStatus() {
        return this.ideaEntity.getStatus();
    }

    public void setStatus(Integer status) {
        this.ideaEntity.setStatus(status);
    }

    public String getDescription() {
        return this.ideaEntity.getDescription();
    }

    public void setDescription(String description) {
        this.ideaEntity.setDescription(description);
    }

    public String getBusinessImpact() {
        return this.ideaEntity.getBusinessImpact();
    }

    public void setBusinessImpact(String businessImpact) {
        this.ideaEntity.setBusinessImpact(businessImpact);
    }

    public Integer getLikes() {
        return this.ideaEntity.getLikes();
    }

    public void setLikes(Integer likes) {
        this.ideaEntity.setLikes(likes);
    }

    public Date getCreateDate() {
        return this.ideaEntity.getCreateDate();
    }

    public void setCreateDate(Date createDate) {
        this.ideaEntity.setCreateDate(createDate);
    }


    public Integer getImages() {
        return this.ideaEntity.getImages();
    }

    public void setImages(Integer images) {
        this.ideaEntity.setImages(images);
    }


    public IdeaEntity getIdeaEntity() {
        return ideaEntity;
    }

    public void setIdeaEntity(IdeaEntity ideaEntity) {
        this.ideaEntity = ideaEntity;
    }

    public List<String> getImage() {
        return image;
    }

    public void setImage(List<String> images) {
        this.image = images;
    }
}
