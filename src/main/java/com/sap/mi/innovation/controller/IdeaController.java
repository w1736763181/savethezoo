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
import java.util.ArrayList;
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
//    @Autowired
//    private IVotingRepository iVotingRepository;

    // 用户管理
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List> getAllIdeas(
            @RequestParam(value = "uid", required = false) int uid
    ) {
        // 找到user表里的所有记录
        List<IdeaEntity> ideaList = ideaRepository.findAll();
        //获得当前用户点赞列表
//        List<IVotingEntity> IVotingList = iVotingRepository.findByuid(uid);
        //获取idealist中每个idea的封面地址
//        List<String> ideaCoverpageList = new LinkedList<String>();
        File rootPath = new File("C:\\Users\\I309908\\IdeaProjects\\savethezoo\\src\\main\\webapp\\www\\uploadimage\\idea");
        String[] filesname = rootPath.list();
        //拼接每个idea的第一张图片地址
        for(int i = 0;i<filesname.length;i++){
            System.out.println(filesname[i]);
//            ideaCoverpageList.add("10.59.186.16:8888/www/uploadimage/idea"+"/"+filesname[i]+"/"+"0.png");
        }
        List responseList = new ArrayList();
        responseList.add(ideaList);
//        responseList.add(IVotingList);
//        responseList.add(ideaCoverpageList) ;
        return ResponseEntity.ok(responseList);
    }


    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> create(@RequestParam(value = "image", required = false) MultipartFile[] uploadImage,
                                             @RequestParam(value = "uid", required = false) int uid,
                                             @RequestParam(value = "category", required = false) String category,
                                             @RequestParam(value = "title", required = false) String title,
                                             @RequestParam(value = "description", required = false) String description,
                                             @RequestParam(value = "businessImpact", required = false) String businessImpact)
            throws IOException{
        IdeaEntity idea = new IdeaEntity();
        idea.setUid(uid);
        idea.setCategory(category);
        idea.setTitle(title);
        idea.setDiscription(description);
        idea.setBusinessImpact(businessImpact);
        idea.setCreateDate(new java.sql.Date(new java.util.Date().getTime()));
        int imageNum = uploadImage.length;
        idea.setImages(imageNum);
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
        String ideaDirPath = "\\uploadImage\\idea\\"+savedIdea.getId();
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
        System.out.println(ideaDir.listFiles()[0]);
        return ResponseEntity.ok("Idea created successfully");
    }

    @RequestMapping(value="/create", method = RequestMethod.POST)
    public ResponseEntity<IdeaEntity> createIdea(@RequestParam(value = "image", required = false) MultipartFile[] uploadImage,
                                                 @RequestParam(value = "uid", required = false) int uid,
                                                 @RequestParam(value = "category", required = false) String category,
                                                 @RequestParam(value = "title", required = false) String title,
                                                 @RequestParam(value = "description", required = false) String description,
                                                 @RequestParam(value = "businessImpact", required = false) String businessImpact) {

        IdeaEntity idea = new IdeaEntity();
        idea.setUid(uid);
        idea.setCategory(category);
        idea.setTitle(title);
        idea.setDiscription(description);
        idea.setBusinessImpact(businessImpact);
        int imageNum = uploadImage.length;
        idea.setImages(imageNum);
        IdeaEntity savedIdea;
        try {
            savedIdea = ideaRepository.saveAndFlush(idea);
        }catch(Exception e){
            e.printStackTrace();
            Logger logger = Logger.getLogger(UserController.class);
            logger.error(e.getMessage());
            return new ResponseEntity<IdeaEntity>(HttpStatus.EXPECTATION_FAILED);
        }

        String ideaDirPath = "img\\idea\\"+savedIdea.getId();
        System.out.println(ideaDirPath);
        File ideaDir = new File(ideaDirPath);
        if(!ideaDir.exists())
            ideaDir.mkdirs();
        for(int i = 0; i < uploadImage.length;i++) {
            try {
                BufferedImage src = ImageIO.read(new ByteArrayInputStream(uploadImage[i].getBytes()));
                File destination = new File(ideaDirPath + File.pathSeparator + i + ".png");
                if (!destination.exists())
                    destination.createNewFile();
                ImageIO.write(src, "png", destination);
            }catch(IOException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity(savedIdea, HttpStatus.OK);
    }

}
