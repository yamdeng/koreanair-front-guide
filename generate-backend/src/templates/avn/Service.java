package ${packageName}.service;

import com.github.pagehelper.PageInfo;
import java.util.List;

import ${packageName}.dto.${Entity}Dto;


public interface ${Entity}Service {

    ${Entity}Dto select${Entity}(int id);
    PageInfo<${Entity}Dto> select${Entity}List(${Entity}Dto paramDto);

    void insert${Entity}(${Entity}Dto dto);
    void update${Entity}(${Entity}Dto dto);
    void delete${Entity}(int id);
    void save${Entity}(List<${Entity}Dto> dataList);
    
}
