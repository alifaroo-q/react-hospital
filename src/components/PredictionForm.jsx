import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import { memo } from "react";

const PredictionForm = memo(({ formFields, formFieldsChangeHandler }) => {
  const [isSmaller] = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <SimpleGrid columns={isSmaller ? 1 : 3} spacing={"1rem"}>
        {formFields.map((formField) => (
          <FormControl key={formField.id}>
            <FormLabel>{formField.label}</FormLabel>
            <Input
              name={formField.name}
              value={formField.value}
              type="text"
              onChange={formFieldsChangeHandler}
            />
          </FormControl>
        ))}
      </SimpleGrid>
    </form>
  );
});
export default PredictionForm;
