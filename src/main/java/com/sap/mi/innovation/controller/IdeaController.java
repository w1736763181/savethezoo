package com.sap.mi.innovation.controller;

import com.sap.mi.innovation.model.IdeaEntity;
import com.sap.mi.innovation.repository.IdeaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Date;
import java.util.List;

/**
 * Created by I309891 on 1/12/2016.
 */
@RestController
@RequestMapping(value = "idea")
public class IdeaController {
    // 自动装配
    @Autowired
    private IdeaRepository ideaRepository;

    // 用户管理
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<IdeaEntity> getAllIdeas() {
        // 找到user表里的所有记录
        List<IdeaEntity> ideaList = ideaRepository.findAll();

        // 返回 pages 目录下的 userManage.jsp 页面
        return ideaList;
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public ResponseEntity<String> createIdea(@RequestParam(value = "image", required = false) MultipartFile[] uploadImage,
                                             @RequestParam(value = "uid", required = false) int uid,
                                             @RequestParam(value = "cid", required = false) int cid,
                                             @RequestParam(value = "title", required = false) String title,
                                             @RequestParam(value = "status", required = false) int status,
                                             @RequestParam(value = "description", required = false) String description,
                                             @RequestParam(value = "businessImpact", required = false) String businessImpact)
    throws IOException{
        IdeaEntity idea = new IdeaEntity();
        idea.setUid(uid);
        idea.setCid(cid);
        idea.setTitle(title);
        idea.setStatus(status);
        idea.setDescription(description);
        idea.setBusinessimpact(businessImpact);
        idea.setCreateddate(new Date().toString());
        int imageNum = uploadImage.length;
        idea.setImagenum(imageNum);
        IdeaEntity savedIdea;
        try {
            savedIdea = ideaRepository.saveAndFlush(idea);
        }catch(Exception e){
            e.printStackTrace();
            Logger logger = Logger.getLogger(UserController.class);
            logger.error(e.getMessage());
            return new ResponseEntity<String>(HttpStatus.EXPECTATION_FAILED);
        }
        String ps = File.separator;
//        String ideaDirPath = System.getProperty("user.home")+ps+"IdeaProjects"+ps+"innovation_zoo"+ps+"src"+ps+"main"+ps+"uploadedImage"+ps+"idea"+ps+savedIdea.getId();
        String ideaDirPath = "C:\\Users\\I309908\\IdeaProjects\\Innovation_Zoo\\src\\main\\uploadImage\\idea\\"+savedIdea.getId();
        System.out.println(ideaDirPath);
        File ideaDir = new File(ideaDirPath);
        if(!ideaDir.exists())
            ideaDir.mkdirs();
        for(int i = 0; i < uploadImage.length;i++) {
            BufferedImage src = ImageIO.read(new ByteArrayInputStream(uploadImage[i].getBytes()));
            File destination = new File(ideaDirPath + ps + i + ".png");
            if (!destination.exists())
                destination.createNewFile();
            ImageIO.write(src, "png", destination);
        }
        return ResponseEntity.ok("Idea created successfully");
    }

}
