package com.sap.mi.innovation.controller;

import com.sap.mi.innovation.model.UsersEntity;
import com.sap.mi.innovation.repository.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

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
    public List<UsersEntity> getAllUsers() {
        // 返回 pages 目录下的 userManage.jsp 页面
        return userRepository.findAll();
    }

    //用户注册
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<UsersEntity> registerUser(@RequestBody UsersEntity user) {
        try {
            userRepository.saveAndFlush(user);
            return new ResponseEntity<UsersEntity>(user, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            Logger logger = Logger.getLogger(UserController.class);
            logger.error(e.getMessage());
            return new ResponseEntity<UsersEntity>(HttpStatus.EXPECTATION_FAILED);
        }
    }
    //用户登录
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody UsersEntity user){
        List<UsersEntity> userLsit = userRepository.findUserByEmail(user.getEmail());
        if(userLsit.isEmpty()){
            return new ResponseEntity<String>("Email not registered.", HttpStatus.UNAUTHORIZED);//-1 represents this email is not registered
        }
        else{
            UsersEntity loginUser = userLsit.get(0);
            if(!user.getPassword().equals(loginUser.getPassword())){
                return new ResponseEntity<String>("Wrong password.", HttpStatus.UNAUTHORIZED);
            }
                return new ResponseEntity<String>("Login successfully.", HttpStatus.OK);
        }
    }
}