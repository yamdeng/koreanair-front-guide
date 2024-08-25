package ${packageName}.dto;

import com.koreanair.ksms.common.dto.CommonDto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Schema(description = "${tableDescription}")
public class ${Entity}Dto extends CommonDto {
    ${columns}
}
