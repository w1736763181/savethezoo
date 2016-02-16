package com.sap.mi.innovation.controller;

import com.sap.mi.innovation.model.CategoryEntity;
import com.sap.mi.innovation.model.UsersEntity;
import com.sap.mi.innovation.repository.CategoryRepository;
import com.sap.mi.innovation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by I309891 on 1/27/2016.
 */

@RestController
@RequestMapping(value = "category")
public class CategoryController {

    // 自动装配
    @Autowired
    private CategoryRepository categoryRepository;

    // 用户管理
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<CategoryEntity>> getAllCategory() {
        // 返回 pages 目录下的 userManage.jsp 页面
        List<CategoryEntity> categorylsit = categoryRepository.findByIdStatus(1);
        ResponseEntity<List<CategoryEntity>> res = new ResponseEntity<List<CategoryEntity>>(categorylsit, HttpStatus.OK);
        return res;
    }

}
