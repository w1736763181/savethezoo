package com.sap.mi.innovation.repository;

import com.sap.mi.innovation.model.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by I309891 on 1/12/2016.
 */
@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {

}
