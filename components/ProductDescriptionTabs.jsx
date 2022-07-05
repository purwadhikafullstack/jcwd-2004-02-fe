import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function ProductDescriptionTabs({ product, description }) {
  <Tabs isFitted textColor={"brand.primary"}>
    <TabList height={"58px"}>
      <Tab
        _selected={{
          borderBottom: "4px solid",
          borderBottomColor: "brand.primary",
        }}
      >
        Deskripsi
      </Tab>
      <Tab
        _selected={{
          borderBottom: "4px solid",
          borderBottomColor: "brand.primary",
        }}
      >
        Cara Pakai
      </Tab>
      <Tab
        _selected={{
          borderBottom: "4px solid",
          borderBottomColor: "brand.primary",
        }}
      >
        Peringatan
      </Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        {description.map((val, id) => {
          return (
            <div
              key={id}
              className={`grid grid-cols-2 py-[16px] ${
                id < description.length - 1 ? "border-b-2" : null
              }`}
              // className="grid grid-cols-2 border-b-2 py-[16px]"
            >
              <div className="col-span-1 font-semibold">{val[0]}</div>
              <div className="col-span-1">{val[1]}</div>
            </div>
          );
        })}
      </TabPanel>
      <TabPanel>
        <div className="grid grid-cols-2 py-[16px]">
          <div className="col-span-1 font-semibold">Cara Penggunaan</div>
          <div className="col-span-1">{product.usage}</div>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="grid grid-cols-2 py-[16px]">
          <div className="col-span-1 font-semibold">Peringatan</div>
          <div className="col-span-1">{product.warning}</div>
        </div>
      </TabPanel>
    </TabPanels>
  </Tabs>;
}

export default ProductDescriptionTabs;

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
