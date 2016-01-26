package com.sap.mi.innovation.model;

import javax.persistence.*;

/**
 * Created by I309908 on 1/26/2016.
 */
@Entity
@Table(name = "idea", schema = "public", catalog = "innovation")
public class IdeaEntity {
    private Integer id;
    private Integer uid;
    private Integer cid;
    private String title;
    private Integer status;
    private String description;
    private String businessimpact;
    private Integer likes;
    private String createddate;
    private Integer imagenum;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    @Basic
    @Column(name = "title", nullable = true, length = 50)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
    @Column(name = "description", nullable = true, length = -1)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "businessimpact", nullable = true, length = -1)
    public String getBusinessimpact() {
        return businessimpact;
    }

    public void setBusinessimpact(String businessimpact) {
        this.businessimpact = businessimpact;
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
    @Column(name = "createddate", nullable = true, length = 50)
    public String getCreateddate() {
        return createddate;
    }

    public void setCreateddate(String createddate) {
        this.createddate = createddate;
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

        IdeaEntity that = (IdeaEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (uid != null ? !uid.equals(that.uid) : that.uid != null) return false;
        if (cid != null ? !cid.equals(that.cid) : that.cid != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (businessimpact != null ? !businessimpact.equals(that.businessimpact) : that.businessimpact != null)
            return false;
        if (likes != null ? !likes.equals(that.likes) : that.likes != null) return false;
        if (createddate != null ? !createddate.equals(that.createddate) : that.createddate != null) return false;
        if (imagenum != null ? !imagenum.equals(that.imagenum) : that.imagenum != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (uid != null ? uid.hashCode() : 0);
        result = 31 * result + (cid != null ? cid.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (businessimpact != null ? businessimpact.hashCode() : 0);
        result = 31 * result + (likes != null ? likes.hashCode() : 0);
        result = 31 * result + (createddate != null ? createddate.hashCode() : 0);
        result = 31 * result + (imagenum != null ? imagenum.hashCode() : 0);
        return result;
    }
}
