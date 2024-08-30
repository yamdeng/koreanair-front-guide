package ${packageName}.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.koreanair.ksms.common.service.AbstractBaseService;
import ${packageName}.dto.${Entity}Dto;

@Service
public class ${Entity}ServiceImpl extends AbstractBaseService implements ${Entity}Service {

    @Override
    public ${Entity}Dto select${Entity}(int id) {
        return commonSql.selectOne("${Entity}.select${Entity}", id);
    }

    @SuppressWarnings("unchecked")
    @Override
    public PageInfo<${Entity}Dto> select${Entity}List(${Entity}Dto dto) {
        List<${Entity}Dto> resultList = commonSql.selectList("${Entity}.select${Entity}List", dto);
        return PageInfo.of(resultList);
    }

    @Override
    public void insert${Entity}(${Entity}Dto dto) {
        commonSql.insert("${Entity}.insert${Entity}", dto);
    }

    @Override
    public void update${Entity}(${Entity}Dto dto) {
        commonSql.update("${Entity}.update${Entity}", dto);
    }

    @Override
    public void delete${Entity}(int id) {
        commonSql.delete("${Entity}.delete${Entity}", id);
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public void save${Entity}(List<${Entity}Dto> dataList) {
        ObjectMapper objectMapper = new ObjectMapper();

        List<Map<String, Object>> mapList = dataList.stream()
                .map(dto -> (Map<String, Object>) objectMapper.convertValue(dto, Map.class))
                .collect(Collectors.toList());

        // commonSql.save("${Entity}", mapList);
    }
}
