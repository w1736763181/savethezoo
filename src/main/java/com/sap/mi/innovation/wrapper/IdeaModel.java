package com.sap.mi.innovation.wrapper;

import java.util.Date;
import java.util.List;

/**
 * Created by I324161 on 2/17/2016.
 */
public class IdeaModel {
    private Integer id;
    private String firstname;
    private String title;
    private String description;
    private Integer likes;
    private Integer uid;

    public String getCreatedate() {
        return createdate;
    }

    public void setCreatedate(String createdate) {
        this.createdate = createdate;
    }

    private String createdate;

    public Integer getImages() {
        return images;
    }

    public void setImages(Integer images) {
        this.images = images;
    }

    private Integer images;

    public String getCategoryImage() {
        return categoryImage;
    }

    public void setCategoryImage(String categoryImage) {
        this.categoryImage = categoryImage;
    }

    private String categoryImage;

    public Integer getIdeaid() {
        return ideaid;
    }

    public void setIdeaid(Integer ideaid) {
        this.ideaid = ideaid;
    }

    private Integer ideaid;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }







}
