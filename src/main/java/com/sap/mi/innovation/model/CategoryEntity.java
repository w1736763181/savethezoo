package com.sap.mi.innovation.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by I309891 on 1/27/2016.
 */
@Entity
@Table(name = "category", schema = "public", catalog = "innovation")
public class CategoryEntity {
    @EmbeddedId CategoryId id;
    private String title;
    private String discription;
    private String image;

    @Basic
    @Column(name = "animal")
    public String getAnimal() {
        return id.getAnimal();
    }

    public void setAnimal(String animal) {
        this.id.setAnimal(animal);
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
    @Column(name = "discription")
    public String getDiscription() {
        return discription;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
    }

    @Basic
    @Column(name = "status")
    public Integer getStatus() {
        return id.getStatus();
    }

    public void setStatus(Integer status) {
        id.setStatus(status);
    }

    @Basic
    @Column(name = "image")
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CategoryEntity that = (CategoryEntity) o;

        if(!id.equals((that.getId()))) {
            return false;
        }

        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (discription != null ? !discription.equals(that.discription) : that.discription != null) return false;
        if (image != null ? !image.equals(that.image) : that.image != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id.getAnimal() != null ? id.getAnimal().hashCode() : 0;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (discription != null ? discription.hashCode() : 0);
        result = 31 * result + (id.getStatus() != null ? id.getStatus().hashCode() : 0);
        result = 31 * result + (image != null ? image.hashCode() : 0);
        return result;
    }

    public CategoryId getId() {
        return id;
    }
}

@Embeddable
class CategoryId implements Serializable{
    private String animal;
    private Integer status;

    public String getAnimal() {
        return animal;
    }

    public void setAnimal(String animal) {
        this.animal = animal;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryId that = (CategoryId) o;
        if(!this.animal.equals(that.getAnimal())) {
            return false;
        }
        if(!this.status.equals(that.getStatus())) {
            return false;
        }
        return true;
    }
}