package com.sap.mi.innovation.repository;

import com.sap.mi.innovation.model.CategoryEntity;
import com.sap.mi.innovation.model.ICommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by I309891 on 2/22/2016.
 */

@Repository
public interface ICommentRepository extends JpaRepository<ICommentEntity, Integer>  {
    public List<ICommentEntity> findByIdeaid(Integer ideaid);
}
