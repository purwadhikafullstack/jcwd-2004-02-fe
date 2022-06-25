import React, { Component } from "react";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiListUnordered, RiLockPasswordLine } from "react-icons/ri";
import { MdPayments, MdLocationOn } from "react-icons/md";
import { Divider, Box, Image, Icon } from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import ProfileModalEditPhoto from "../components/ProfileModalEditPhoto";
import ProfileModalEditProfile from "../components/ProfileModalEditProfile";
import Navbar from "../components/Navbar";
import { API_URL } from "../helpers";
import moment from "moment";
import "moment/locale/id";

const Profile = () => {
  const { name, email, gender, birthdate, profilepic } = useUser();
  const profpic = profilepic ? `${API_URL + profilepic}` : `../no_pic.png`;
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className=" shadow-md rounded-lg mt-10 mx-auto w-[300px] ml-[52px] h-[380px]">
          <div className="flex ml-5">
            <Image
              borderRadius="full"
              boxSize="75px"
              src={profpic}
              alt="profilepic"
            />
            <div className="mt-6 ml-2 items-center font-bold pr-10 truncate ...">
              {name}
            </div>
          </div>
          <div className="bg-slate-200">
            <Divider className="mt-2" />
          </div>
          <div className="flex">
            <div>
              <div className="flex mt-5 cursor-pointer">
                <CgProfile className="flex ml-10 mt-9 text-2xl items-center" />
                <div className="profileTag">Profil</div>
              </div>
              <div className="flex cursor-pointer">
                <RiLockPasswordLine className="flex ml-10 mt-9 text-2xl items-center" />
                <div className="profileTag">Ganti Password</div>
              </div>

              <div className="flex cursor-pointer">
                <MdLocationOn className="flex ml-10 mt-9 text-2xl items-center" />
                <div className="profileTag">Alamat Pengiriman</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mx-auto shadow-md w-7/12 rounded-lg mt-10 pb-14 ml-10">
          <div>
            <div className="pt-5 ml-11 text-2xl font-bold">Profil</div>
            <div className="bg-slate-200">
              <Divider className="mt-7" />
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <img
                  className="flex items-center ml-11 mt-10 rounded-2xl h-[300px] w-[300px]"
                  src={profpic}
                />
                <ProfileModalEditPhoto />
              </div>
              <div>
                <div>
                  <div className="flex mt-12 ">
                    <div className="profileTag">Nama Lengkap</div>
                    <div className="profileDesc ml-7">{name}</div>
                  </div>
                  <div className="flex">
                    <div className="profileTag">Gender</div>
                    <div className="profileDesc ml-[85px]">
                      {gender ? gender : "-"}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="profileTag">E-mail</div>
                    <div className="profileDesc ml-[93px]">{email}</div>
                  </div>
                  <div className="flex">
                    <div className="profileTag">Tanggal Lahir</div>
                    <div className="profileDesc ml-[40px]">
                      {birthdate ? moment(birthdate).format("LL") : "-"}
                    </div>
                  </div>
                </div>

                <ProfileModalEditProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
