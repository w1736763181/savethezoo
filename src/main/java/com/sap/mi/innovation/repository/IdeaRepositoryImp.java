package com.sap.mi.innovation.repository;

import com.sap.mi.innovation.repository.IdeaRepository;
import com.sap.mi.innovation.wrapper.IdeaModel;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by I324161 on 2/17/2016.
 */
//public class IdeaRepositoryImp {
//
//    @PersistenceUnit
//    private EntityManagerFactory emf;
//    @PersistenceContext
//    private EntityManager  em;
//    public List<IdeaModel> getIdeaInfo(int id) {
//      //  EntityManager em =emf.createEntityManager();
////        String sql = "SELECT idea.id, idea.uid,title, description,likes,users.firstname FROM idea LEFT JOIN (select * from i_voting where i_voting.uid = ?) AS voting ON idea.id = voting.ideaid left join users on idea.uid = users.id ";
////        Query ideaQuery = em.createNativeQuery(sql);
////        ideaQuery.setParameter(1,id);
////        List<Object[]> resultList = ideaQuery.getResultList();
////        List<IdeaModel> ideaModelList = new ArrayList<IdeaModel>();
////        for(int i =0;i<resultList.size();i++) {
////            IdeaModel im = new IdeaModel();
////            im.setId((Integer)(resultList.get(i)[0]));
////            im.setUid((Integer)(resultList.get(i)[1]));
////            im.setTitle((String)(resultList.get(i)[2]));
////            im.setDescription((String)(resultList.get(i)[3]));
////            im.setLikes((Integer)(resultList.get(i)[4]));
////            im.setFirstname((String)(resultList.get(i)[5]));
////            ideaModelList.add(im);
////        }
////        return ideaModelList;
////    }
//}
