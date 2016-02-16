package com.sap.mi.innovation.model;

import javafx.beans.DefaultProperty;

import javax.persistence.*;
import java.sql.Date;

/**
 * Created by I309891 on 1/27/2016.
 */
@Entity
@Table(name = "idea", schema = "public", catalog = "innovation")
public class IdeaEntity {
    private Integer id;
    private Integer uid;
    private String category;
    private String title;
    private Integer status = 0;
    private String description;
    private String businessImpact;
    private Integer likes = 0;
    private Date createDate;
    private Integer images = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "uid")
    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    @Basic
    @Column(name = "category")
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "status")
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Basic
    @Column(name = "description")
    public String getDiscription() {
        return description;
    }

    public void setDiscription(String discription) {
        this.description = discription;
    }

    @Basic
    @Column(name = "businessImpact")
    public String getBusinessImpact() {
        return businessImpact;
    }

    public void setBusinessImpact(String businessImpact) {
        this.businessImpact = businessImpact;
    }

    @Basic
    @Column(name = "likes")
    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    @Basic
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "createDate")
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    @Basic
    @Column(name = "images")
    public Integer getImages() {
        return images;
    }

    public void setImages(Integer images) {
        this.images = images;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IdeaEntity that = (IdeaEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (uid != null ? !uid.equals(that.uid) : that.uid != null) return false;
        if (category != null ? !category.equals(that.category) : that.category != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (businessImpact != null ? !businessImpact.equals(that.businessImpact) : that.businessImpact != null)
            return false;
        if (likes != null ? !likes.equals(that.likes) : that.likes != null) return false;
        if (createDate != null ? !createDate.equals(that.createDate) : that.createDate != null) return false;
        if (images != null ? !images.equals(that.images) : that.images != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (uid != null ? uid.hashCode() : 0);
        result = 31 * result + (category != null ? category.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (businessImpact != null ? businessImpact.hashCode() : 0);
        result = 31 * result + (likes != null ? likes.hashCode() : 0);
        result = 31 * result + (createDate != null ? createDate.hashCode() : 0);
        result = 31 * result + (images != null ? images.hashCode() : 0);
        return result;
    }
}
