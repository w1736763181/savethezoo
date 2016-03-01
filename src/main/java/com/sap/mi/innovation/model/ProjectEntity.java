package com.sap.mi.innovation.model;

import javax.persistence.*;
import java.sql.Date;

/**
 * Created by I309908 on 1/26/2016.
 */
@Entity
@Table(name = "project", schema = "public", catalog = "innovation")
public class ProjectEntity {
    private Integer id;
    private String title;
    private String description;
    private Date startdate;
    private Date todate;
    private Date createddate;
    private Integer status;
    private Integer likes;
    private Integer imagenum;
    private Integer uid;
    private String category;

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
    @Column(name = "title", nullable = true, length = 50)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "description", nullable = true, length = -1)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "startdate", nullable = true, length = 50)
    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date fromdate) {
        this.startdate = fromdate;
    }

    @Basic
    @Column(name = "todate", nullable = true, length = 50)
    public Date getTodate() {
        return todate;
    }

    public void setTodate(Date todate) {
        this.todate = todate;
    }

    @Basic
    @Column(name = "createDate", nullable = true)
    public Date getCreateDate() {
        return createddate;
    }

    public void setCreateDate(Date createddate) {
        this.createddate = createddate;
    }

    @Basic
    @Column(name = "status", nullable = true)
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Basic
    @Column(name = "likes", nullable = true)
    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    @Basic
    @Column(name = "imagenum", nullable = true)
    public Integer getImagenum() {
        return imagenum;
    }

    public void setImagenum(Integer imagenum) {
        this.imagenum = imagenum;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProjectEntity that = (ProjectEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (startdate != null ? !startdate.equals(that.startdate) : that.startdate != null) return false;
        if (todate != null ? !todate.equals(that.todate) : that.todate != null) return false;
        if (createddate != null ? !createddate.equals(that.createddate) : that.createddate != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (likes != null ? !likes.equals(that.likes) : that.likes != null) return false;
        if (imagenum != null ? !imagenum.equals(that.imagenum) : that.imagenum != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (startdate != null ? startdate.hashCode() : 0);
        result = 31 * result + (todate != null ? todate.hashCode() : 0);
        result = 31 * result + (createddate != null ? createddate.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (likes != null ? likes.hashCode() : 0);
        result = 31 * result + (imagenum != null ? imagenum.hashCode() : 0);
        return result;
    }

    @Basic
    @Column(name = "uid", nullable = true)
    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    @Basic
    @Column(name = "category", nullable = true)
    public String getCategory() {
        return category;
    }

    public void setCategory(String cid) {
        this.category = cid;
    }

}
