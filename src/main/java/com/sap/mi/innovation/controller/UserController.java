package com.sap.mi.innovation.controller;

import com.sap.mi.innovation.model.UsersEntity;
import com.sap.mi.innovation.repository.UserRepository;
import com.sap.mi.innovation.utils.ImageUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Created by I309891 on 1/6/2016.
 */

@RestController
@RequestMapping(value = "user")
public class UserController {

    public static final String AVATAR_BASE = "img" + File.separator + "head" + File.separator;
    public static final String DEFAULT_AVATAR = "img" + File.separator +"head" + File.separator + "default.png";

    // 自动装配
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServletContext servletContext;


    // 用户管理
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<UsersEntity>> getAllUsers() {
        // 返回 pages 目录下的 userManage.jsp 页面
        List<UsersEntity> userlsit = userRepository.findUserByAuth(0);
        ResponseEntity<List<UsersEntity>> res = new ResponseEntity<List<UsersEntity>>(userlsit, HttpStatus.OK);
        return res;
    }

    // 用户管理
    @RequestMapping(value = "/{userid}", method = RequestMethod.GET)
    public ResponseEntity<List<UsersEntity>> getUser(@PathVariable int userid) {
        // 返回 pages 目录下的 userManage.jsp 页面
        List<UsersEntity> userlsit = userRepository.findUserById(userid);
        ResponseEntity<List<UsersEntity>> res = new ResponseEntity<List<UsersEntity>>(userlsit, HttpStatus.OK);
        return res;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<List<UsersEntity>> login(@RequestParam(value = "image", required = false) MultipartFile uploadImage,
                                                   @RequestParam(value = "email", required = false) String email,
                                                   @RequestParam(value = "firstname", required = false) String firstname,
                                                   @RequestParam(value = "lastname ", required = false) String lastname,
                                                   @RequestParam(value = "department", required = false) String department,
                                                   @RequestParam(value = "phone", required = false) String phone,
                                                   @RequestParam(value = "password", required = false) String password,
                                                   @RequestParam(value = "type", required = false) String type) throws IOException {
        UsersEntity user = new UsersEntity();
        MultiValueMap responseMap = new LinkedMultiValueMap<String,String>();
        List<UsersEntity> userLsit = new LinkedList<UsersEntity>();
        if ("login".equals(type)) {
            userLsit = userRepository.findUserByEmail(email);
            if (userLsit.isEmpty()) {
                responseMap.add("Message","Username Not Found");
//                responseMap.add(new String(),"Username Not Found");
                return new ResponseEntity<List<UsersEntity>>(userLsit,responseMap,HttpStatus.UNAUTHORIZED);//-1 represents this email is not registered
            } else {
                UsersEntity loginUser = userLsit.get(0);
                if (!password.equals(loginUser.getPassword())) {
                    responseMap.add("Message","Password Wrong");
                    return new ResponseEntity<List<UsersEntity>>(userLsit,responseMap,HttpStatus.UNAUTHORIZED);
                }
                else {
                    responseMap.add("Message","Login Successfully");
                    return new ResponseEntity<List<UsersEntity>>(userLsit,responseMap,HttpStatus.OK);
                }
            }
        }
        //register
        else {
            user.setEmail(email);
            user.setFirstname(firstname);
            user.setLastname(lastname);
            user.setDepartment(department);
            user.setPassword(password);
            user.setPhone(phone);
            try {
                userLsit.add(userRepository.saveAndFlush(user));
            } catch (Exception e) {
                e.printStackTrace();
                Logger logger = Logger.getLogger(UserController.class);
                logger.error(e.getMessage());
                responseMap.add("Message", e.getMessage());
                return new ResponseEntity<List<UsersEntity>>(responseMap, HttpStatus.EXPECTATION_FAILED);
            }
            String ps = File.separator;
            String ideaDirPath = "\\uploadimage\\user\\"+userLsit.get(0).getId();
            System.out.println(ideaDirPath);
            File ideaDir = new File(ideaDirPath);
            if(!ideaDir.exists())
                ideaDir.mkdirs();
            BufferedImage src = ImageIO.read(new ByteArrayInputStream(uploadImage.getBytes()));
            File destination = new File(ideaDirPath + ps + "0.png");
            if (!destination.exists())
                destination.createNewFile();
            ImageIO.write(src, "png", destination);
            responseMap.add("Message", "Register Successfully");
            return new ResponseEntity<List<UsersEntity>>(userLsit, responseMap, HttpStatus.OK);
        }

    }


    //用户注册
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<UsersEntity> registerUser(@RequestBody UsersEntity user) {
        try {
            String headImage = user.getHead();
            if (headImage == null || headImage.equals("")) {
                user.setHead(DEFAULT_AVATAR);
                user = userRepository.saveAndFlush(user);
                return new ResponseEntity<UsersEntity>(user, HttpStatus.OK);
            } else {
                headImage = headImage.replaceFirst("^data:image/[^;]*;base64,?","");
                user.setHead(DEFAULT_AVATAR);
                user = userRepository.saveAndFlush(user);
                String path = AVATAR_BASE + user.getId().toString() + ".png";
                String realPath = servletContext.getRealPath("/") + path;
                BufferedImage file = ImageUtils.decodeToImage(headImage);
                File destination = new File(realPath);
                ImageIO.write(file, "png", destination);
                user.setHead(path);
                user = userRepository.saveAndFlush(user);
                return new ResponseEntity<UsersEntity>(user, HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            Logger logger = Logger.getLogger(UserController.class);
            logger.error(e.getMessage());
            return new ResponseEntity<UsersEntity>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    //用户登录
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<UsersEntity> login(@RequestBody UsersEntity user) {
        MultiValueMap responseMap = new LinkedMultiValueMap<String, String>();
        List<UsersEntity> userLsit = userRepository.findUserByEmail(user.getEmail());
        if (userLsit.isEmpty()) {
            responseMap.add("Message", "User has not been registered, please register first!");
//                responseMap.add(new String(),"Username Not Found");
            return new ResponseEntity<UsersEntity>(responseMap, HttpStatus.UNAUTHORIZED);//-1 represents this email is not registered
        } else {
            UsersEntity loginUser = userLsit.get(0);
            if (!user.getPassword().equals(loginUser.getPassword())) {
                responseMap.add("Message", "Password Wrong");
                return new ResponseEntity<UsersEntity>(responseMap, HttpStatus.UNAUTHORIZED);
            } else {
                responseMap.add("Message", "Login Successfully");
                return new ResponseEntity<UsersEntity>(loginUser, HttpStatus.OK);
            }
        }
    }

    //用户登录
    @RequestMapping(value = "/login/validation", method = RequestMethod.POST)
    public  ResponseEntity<Map<String, String>>loginValidate(@RequestParam(value = "email", required = true) String email,
                                                             @RequestParam(value = "password", required = false) String password) {
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("valid", "true");
        MultiValueMap responseMap = new LinkedMultiValueMap<String, String>();
        List<UsersEntity> userLsit = userRepository.findUserByEmail(email);
        if (userLsit.isEmpty()) {
           map.put("valid", "false");
        }
        else if(password != null) {
            UsersEntity loginUser = userLsit.get(0);
            if (!password.equals(loginUser.getPassword())) {
                map.put("valid", "false");
            }
        }
        return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);

    }
}