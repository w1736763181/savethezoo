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
    private String fromdate;
    private String todate;
    private Date createddate;
    private Integer status;
    private Integer likes;
    private Integer imagenum;
    private Integer uid;
    private Integer cid;

    @Id
    @Column(name = "id", nullable = false)
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
    @Column(name = "fromdate", nullable = true, length = 50)
    public String getFromdate() {
        return fromdate;
    }

    public void setFromdate(String fromdate) {
        this.fromdate = fromdate;
    }

    @Basic
    @Column(name = "todate", nullable = true, length = 50)
    public String getTodate() {
        return todate;
    }

    public void setTodate(String todate) {
        this.todate = todate;
    }

    @Basic
    @Column(name = "createddate", nullable = true)
    public Date getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Date createddate) {
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
        if (fromdate != null ? !fromdate.equals(that.fromdate) : that.fromdate != null) return false;
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
        result = 31 * result + (fromdate != null ? fromdate.hashCode() : 0);
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
    @Column(name = "cid", nullable = true)
    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }
}
