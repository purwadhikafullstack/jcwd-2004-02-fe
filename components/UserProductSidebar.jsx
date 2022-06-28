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

function UserProductSidebar({
  component,
  category_id,
  handleInput,
  handleCheckbox,
  isLoading,
}) {
  return (
    <div className="w-[300px] mr-[48px]">
      <div className="container mb-[32px] cursor-pointer">
        <Accordion
          defaultIndex={[0]}
          allowMultiple
          border="transparent"
          color={"brand.primary"}
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
            {isLoading ? (
              <>
                <AccordionPanel>
                  <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                </AccordionPanel>
                <AccordionPanel>
                  <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                </AccordionPanel>
                <AccordionPanel>
                  <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                </AccordionPanel>
                <AccordionPanel>
                  <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                </AccordionPanel>
              </>
            ) : (
              <div>
                {component.category?.map((val) => {
                  return (
                    <AccordionPanel key={val.id} pb={2}>
                      {category_id == val.id ? (
                        <button className="text-secondary">{val.name}</button>
                      ) : (
                        <button
                          value={val.id}
                          name="category"
                          onClick={(e) => handleInput(e)}
                        >
                          {val.name}
                        </button>
                      )}
                    </AccordionPanel>
                  );
                })}
              </div>
            )}
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
            color={"brand.primary"}
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
              {isLoading ? (
                <>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                </>
              ) : (
                <div>
                  {component.symptom?.map((val) => {
                    return (
                      <AccordionPanel key={val.id} pb={2}>
                        <Checkbox
                          borderColor={"gray.600"}
                          name="symptom"
                          colorScheme="purple"
                          value={val.id}
                          onChange={(e) => handleCheckbox(e, "symptom")}
                        >
                          {val.name}
                        </Checkbox>
                      </AccordionPanel>
                    );
                  })}
                  <AccordionPanel
                    textColor={"brand.secondary"}
                    fontWeight={"medium"}
                  >
                    Lihat Lebih Lengkap
                  </AccordionPanel>
                </div>
              )}
            </AccordionItem>
          </Accordion>
        </div>
        <div className=" border-b-2">
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            border="transparent"
            color={"brand.primary"}
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
            color={"brand.primary"}
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
              {isLoading ? (
                <>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                </>
              ) : (
                <div>
                  {component.type?.map((val) => {
                    return (
                      <AccordionPanel key={val.id} pb={2}>
                        <Checkbox
                          borderColor={"gray.600"}
                          colorScheme="purple"
                          value={val.id}
                          onChange={(e) => handleCheckbox(e, "type")}
                        >
                          {val.name}
                        </Checkbox>
                      </AccordionPanel>
                    );
                  })}
                  <AccordionPanel
                    textColor={"brand.secondary"}
                    fontWeight={"medium"}
                  >
                    Lihat Lebih Lengkap
                  </AccordionPanel>
                </div>
              )}
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            border="transparent"
            color={"brand.primary"}
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
              {isLoading ? (
                <>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                  <AccordionPanel>
                    <div className="animation-pulse bg-slate-200 h-[14px] rounded-xl" />
                  </AccordionPanel>
                </>
              ) : (
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
                  {component.brand?.map((val) => {
                    return (
                      <AccordionPanel key={val.id} pb={2}>
                        <Checkbox
                          borderColor={"gray.600"}
                          colorScheme="purple"
                          value={val.id}
                          onChange={(e) => handleCheckbox(e, "brand")}
                        >
                          {val.name}
                        </Checkbox>
                      </AccordionPanel>
                    );
                  })}
                  <AccordionPanel
                    textColor={"brand.secondary"}
                    fontWeight={"medium"}
                  >
                    Lihat Lebih Lengkap
                  </AccordionPanel>
                </div>
              )}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default UserProductSidebar;
