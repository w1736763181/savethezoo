package com.sap.mi.innovation.repository;

import com.sap.mi.innovation.model.IdeaEntity;
import com.sap.mi.innovation.wrapper.IdeaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by I309891 on 1/12/2016.
 */
@Repository
public interface IdeaRepository extends JpaRepository<IdeaEntity, Integer> {
}
