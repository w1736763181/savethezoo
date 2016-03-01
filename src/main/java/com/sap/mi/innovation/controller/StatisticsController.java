package com.sap.mi.innovation.controller;

import com.sap.mi.innovation.model.UsersEntity;
import com.sap.mi.innovation.wrapper.IdeaModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by I309891 on 2/22/2016.
 */

@RestController
@RequestMapping(value = "stat")
public class StatisticsController {
    @PersistenceUnit
    private EntityManagerFactory emf;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Integer>> getStat() {
        EntityManager em = emf.createEntityManager();
        Map<String, Integer> result = new HashMap<String, Integer>();
        String sql = "SELECT COUNT(*) FROM users WHERE authentication = 0";
        Query ideaQuery = em.createNativeQuery(sql);
        List<Integer> userCount = ideaQuery.getResultList();
        result.put("userNum", userCount.get(0));
        String sql2 = "SELECT COUNT(*) FROM IDEA";
        Query ideaQuery2 = em.createNativeQuery(sql2);
        List<Integer> ideaCount = ideaQuery2.getResultList();
        result.put("ideaNum", ideaCount.get(0));
        String sql3 = "SELECT COUNT(*) FROM project";
        Query ideaQuery3 = em.createNativeQuery(sql3);
        List<Integer> projectCount = ideaQuery3.getResultList();
        result.put("projectNum", projectCount.get(0));
        return new ResponseEntity<Map<String, Integer>>(result, HttpStatus.OK);
    }
}
