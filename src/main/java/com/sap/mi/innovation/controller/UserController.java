package com.sap.mi.innovation.controller;

import com.sap.mi.innovation.model.UsersEntity;
import com.sap.mi.innovation.repository.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Created by I309891 on 1/6/2016.
 */

@RestController
@RequestMapping(value = "user")
public class UserController {

    // 自动装配
    @Autowired
    private UserRepository userRepository;

    // 用户管理
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<List<UsersEntity>> getAllUsers() {
        // 返回 pages 目录下的 userManage.jsp 页面
        List<UsersEntity> userlsit = userRepository.findAll();
        ResponseEntity<List<UsersEntity>> res = new ResponseEntity<List<UsersEntity>>(userlsit,HttpStatus.OK);
        return res;
    }

    //用户注册
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<UsersEntity> registerUser(@RequestBody UsersEntity user) {
        try {
            userRepository.saveAndFlush(user);
            return new ResponseEntity<UsersEntity>(HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            Logger logger = Logger.getLogger(UserController.class);
            logger.error(e.getMessage());
            return new ResponseEntity<UsersEntity>(HttpStatus.EXPECTATION_FAILED);
        }
    }
    //用户登录
    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<List<UsersEntity>> login(@RequestBody UsersEntity user,
                                        @RequestParam String type) {
        MultiValueMap responseMap = new LinkedMultiValueMap<String,String>();
        if ("login".equals(type)) {
            List<UsersEntity> userLsit = userRepository.findUserByEmail(user.getEmail());
            if (userLsit.isEmpty()) {
                responseMap.add("Message","Username Not Found");
//                responseMap.add(new String(),"Username Not Found");
                return new ResponseEntity<List<UsersEntity>>(userLsit,responseMap,HttpStatus.UNAUTHORIZED);//-1 represents this email is not registered
            } else {
                UsersEntity loginUser = userLsit.get(0);
                if (!user.getPassword().equals(loginUser.getPassword())) {
                    responseMap.add("Message","Password Wrong");
                    return new ResponseEntity<List<UsersEntity>>(userLsit,responseMap,HttpStatus.UNAUTHORIZED);
                }
                else {
                    responseMap.add("Message","Login Successfully");
                    return new ResponseEntity<List<UsersEntity>>(userLsit, HttpStatus.OK);
                }
            }
        }
        else
            return new ResponseEntity<List<UsersEntity>>(HttpStatus.EXPECTATION_FAILED);
    }
}