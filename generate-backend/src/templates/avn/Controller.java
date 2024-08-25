package ${packageName}.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import com.koreanair.ksms.common.utils.ResponseUtil;
import ${packageName}.service.${Entity}Service;
import ${packageName}.dto.${Entity}Dto;

import java.util.List;

@Tag(name = "${tableDescription}", description = "${tableDescription} API")
@Slf4j
@RestController
@RequestMapping(value = "${apiPathRoot}")
public class ${Entity}Controller {

    @Autowired
    private ${Entity}Service ${entity}Service;

    @Operation(summary = "${tableDescription} 상세 조회", description = "${tableDescription} 상세 조회 API")
    @GetMapping("${apiPathDetail}/{id}")
    public ResponseEntity<?> select${Entity}(@PathVariable(value="id", required=true) int id) {
        
        ${Entity}Dto result = ${entity}Service.select${Entity}(id);
        return ResponseUtil.createSuccessResponse(result);

    }

    @Operation(summary = "${tableDescription} 목록 조회", description = "${tableDescription} 목록 조회 API")
    @GetMapping("${apiPathDetail}")
    public ResponseEntity<?> getDeptList(
        @RequestParam(value="pageNum", required=false, defaultValue="1") int pageNum
        ,@RequestParam(value="pageSize", required=false, defaultValue="10") int pageSize){
  
        ${Entity}Dto paramDto = new ${Entity}Dto();

        // Page 조회
        PageHelper.startPage(pageNum, pageSize);
        PageInfo<${Entity}Dto> pageList = ${entity}Service.select${Entity}List(paramDto);
        return ResponseUtil.createSuccessResponse(pageList);
    }

    @Operation(summary = "${tableDescription} 일괄 저장", description = "${tableDescription} 일괄 저장 API")
    @PostMapping("${apiPathDetail}/bulk")
    public ResponseEntity<?> save${Entity}(@RequestBody List<${Entity}Dto> reqDtoList) {

        ${entity}Service.save${Entity}(reqDtoList);
        return ResponseUtil.createSuccessResponse();
    }

    @Operation(summary = "${tableDescription} 등록", description = "${tableDescription} 등록 API")
    @PostMapping(value = "${apiPathDetail}")
    public ResponseEntity<?> insert${Entity}(@Valid @RequestBody(required=true) ${Entity}Dto reqDto){

        ${entity}Service.insert${Entity}(reqDto);
        return ResponseUtil.createSuccessResponse();
    }

    @Operation(summary = "${tableDescription} 수정", description = "${tableDescription} 수정 API")
    @PutMapping(value = "${apiPathDetail}")
    public ResponseEntity<?> update${Entity}(@Valid @RequestBody(required=true) ${Entity}Dto reqDto){
        
        ${entity}Service.update${Entity}(reqDto);
        return ResponseUtil.createSuccessResponse();
    }

    @Operation(summary = "${tableDescription} 삭제", description = "${tableDescription} 삭제 API")
    @DeleteMapping(value = "${apiPathDetail}/{id}")
    public ResponseEntity<?> delete${Entity}(@PathVariable(value="id", required=true) int id){
        ${entity}Service.delete${Entity}(id);
        return ResponseUtil.createSuccessResponse();
    }

}


