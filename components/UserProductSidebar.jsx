import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { GrSearch } from "react-icons/gr";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../helpers";

function UserProductSidebar() {
  const [data, setData] = useState({});

  const fetchComponentObat = async () => {
    try {
      let res = await axios.get(`${API_URL}/products/component`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComponentObat();
  }, []);

  return (
    <div className="w-[300px] mr-[48px]">
      <div className="container mb-[32px]">
        <Accordion
          defaultIndex={[0]}
          allowMultiple
          border="transparent"
          color={"purple.800"}
          my={"9px"}
          ml={"8px"}
        >
          <AccordionItem>
            <h2>
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                _hover={{ textColor: "violet.900" }}
              >
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight={"bold"}
                  letterSpacing={"wider"}
                >
                  KATEGORI
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <div>
              {data.category?.map((val) => {
                return (
                  <AccordionPanel key={val.id} pb={2}>
                    <a>{val.name}</a>
                  </AccordionPanel>
                );
              })}
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="container">
        <div className="py-[24px] text-center border-b-2">
          <Button
            height="46px"
            width="211px"
            textColor={"whiteAlpha.900"}
            bgColor={"gray.400"}
          >
            Hapus semua filter
          </Button>
        </div>
        <div className=" border-b-2">
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            border="transparent"
            color={"purple.800"}
            my={"9px"}
            ml={"8px"}
          >
            <AccordionItem>
              <h2>
                <AccordionButton
                  _focus={{ boxShadow: "none" }}
                  _hover={{ textColor: "violet.900" }}
                >
                  <Box
                    flex="1"
                    textAlign="left"
                    fontWeight={"bold"}
                    letterSpacing={"wider"}
                  >
                    KELUHAN
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <div>
                {data.symptom?.map((val) => {
                  return (
                    <AccordionPanel key={val.id} pb={2}>
                      <Checkbox borderColor={"gray.600"} colorScheme="purple">
                        {val.name}
                      </Checkbox>
                    </AccordionPanel>
                  );
                })}
                <AccordionPanel textColor={"purple.500"} fontWeight={"medium"}>
                  Lihat Lebih Lengkap
                </AccordionPanel>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
        <div className=" border-b-2">
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            border="transparent"
            color={"purple.800"}
            my={"9px"}
            ml={"8px"}
          >
            <AccordionItem>
              <h2>
                <AccordionButton
                  _focus={{ boxShadow: "none" }}
                  _hover={{ textColor: "violet.900" }}
                >
                  <Box
                    flex="1"
                    textAlign="left"
                    fontWeight={"bold"}
                    letterSpacing={"wider"}
                  >
                    HARGA
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <div>
                <AccordionPanel pb={2}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="purple.900"
                      fontWeight="semibold"
                      children="Rp"
                    />
                    <Input
                      fontSize={"14px"}
                      letterSpacing={"wider"}
                      focusBorderColor="purple.600"
                      placeholder="Harga Minimum"
                    />
                  </InputGroup>
                </AccordionPanel>
                <AccordionPanel pb={2}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="purple.900"
                      fontWeight="semibold"
                      children="Rp"
                    />
                    <Input
                      fontSize={"14px"}
                      letterSpacing={"wider"}
                      focusBorderColor="purple.600"
                      placeholder="Harga Maksimum"
                    />
                  </InputGroup>
                </AccordionPanel>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
        <div className=" border-b-2">
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            border="transparent"
            color={"purple.800"}
            my={"9px"}
            ml={"8px"}
          >
            <AccordionItem>
              <h2>
                <AccordionButton
                  _focus={{ boxShadow: "none" }}
                  _hover={{ textColor: "violet.900" }}
                >
                  <Box
                    flex="1"
                    textAlign="left"
                    fontWeight={"bold"}
                    letterSpacing={"wider"}
                  >
                    JENIS OBAT
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <div>
                {data.type?.map((val) => {
                  return (
                    <AccordionPanel key={val.id} pb={2}>
                      <Checkbox borderColor={"gray.600"} colorScheme="purple">
                        {val.name}
                      </Checkbox>
                    </AccordionPanel>
                  );
                })}
                <AccordionPanel textColor={"purple.500"} fontWeight={"medium"}>
                  Lihat Lebih Lengkap
                </AccordionPanel>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            border="transparent"
            color={"purple.800"}
            my={"9px"}
            ml={"8px"}
          >
            <AccordionItem>
              <h2>
                <AccordionButton
                  _focus={{ boxShadow: "none" }}
                  _hover={{ textColor: "violet.900" }}
                >
                  <Box
                    flex="1"
                    textAlign="left"
                    fontWeight={"bold"}
                    letterSpacing={"wider"}
                  >
                    BRAND OBAT
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <div>
                <AccordionPanel>
                  <InputGroup borderColor="gray.400">
                    <Input
                      fontSize={"14px"}
                      letterSpacing={"wider"}
                      focusBorderColor="purple.600"
                      placeholder="Harga Minimum"
                    />
                    <InputRightElement
                      pr={"20px"}
                      pointerEvents="none"
                      color="purple.900"
                      fontWeight="semibold"
                      children={<Icon as={GrSearch} color="gray.300" />}
                    />
                  </InputGroup>
                </AccordionPanel>
                {data.brand?.map((val) => {
                  return (
                    <AccordionPanel key={val.id} pb={2}>
                      <Checkbox borderColor={"gray.600"} colorScheme="purple">
                        {val.name}
                      </Checkbox>
                    </AccordionPanel>
                  );
                })}
                <AccordionPanel textColor={"purple.500"} fontWeight={"medium"}>
                  Lihat Lebih Lengkap
                </AccordionPanel>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default UserProductSidebar;
