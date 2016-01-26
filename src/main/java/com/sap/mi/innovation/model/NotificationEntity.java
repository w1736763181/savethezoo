package com.sap.mi.innovation.model;

import javax.persistence.*;
import java.sql.Date;

/**
 * Created by I309908 on 1/26/2016.
 */
@Entity
@Table(name = "notification", schema = "public", catalog = "innovation")
public class NotificationEntity {
    private Integer id;
    private Integer type;
    private Date date;
    private String content;
    private Integer hasread;
    private String containedvalue;
    private Integer uid;

    @Id
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "type", nullable = true)
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Basic
    @Column(name = "date", nullable = true)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Basic
    @Column(name = "content", nullable = true, length = -1)
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Basic
    @Column(name = "hasread", nullable = true)
    public Integer getHasread() {
        return hasread;
    }

    public void setHasread(Integer hasread) {
        this.hasread = hasread;
    }

    @Basic
    @Column(name = "containedvalue", nullable = true, length = 50)
    public String getContainedvalue() {
        return containedvalue;
    }

    public void setContainedvalue(String containedvalue) {
        this.containedvalue = containedvalue;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        NotificationEntity that = (NotificationEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (type != null ? !type.equals(that.type) : that.type != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        if (content != null ? !content.equals(that.content) : that.content != null) return false;
        if (hasread != null ? !hasread.equals(that.hasread) : that.hasread != null) return false;
        if (containedvalue != null ? !containedvalue.equals(that.containedvalue) : that.containedvalue != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (hasread != null ? hasread.hashCode() : 0);
        result = 31 * result + (containedvalue != null ? containedvalue.hashCode() : 0);
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
}
