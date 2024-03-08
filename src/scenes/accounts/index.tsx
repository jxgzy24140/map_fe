import React, { useState } from "react";
import { Button, Col, Form, Row } from "antd";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import firebaseApp from "@/utils/firebase";

import PhoneInput from "@/components/Inputs/PhoneInput";
import Input6VerifyCode from "@/components/Inputs/Input6VerifyCode";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import UserStore from "@/stores/userStore";
import { IFirebaseLoginInputDto } from "@/services/auth/dto";
const svgMoneyBag: string =
  require("@/assets/icons/twemoji_money-bag.svg").default;
const svgEllipse: string = require("@/assets/icons/ellipse.svg").default;
const svgbackArrow: string = require("@/assets/icons/backArrow.svg").default;

interface IProps {
  userStore: UserStore;
}

const Login = inject(Stores.UserStore)(
  observer((props: IProps) => {
    const { userStore } = props;
    const [isLoggedInStep, setIsLoggedInStep] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationId, setVerificationId] = useState("");

    const handleVerifyCode = async (value: any) => {
      setVerificationCode(value);
      const auth = getAuth(firebaseApp);
      try {
        const credential = PhoneAuthProvider.credential(
          verificationId,
          value ?? verificationCode
        );
        await signInWithCredential(auth, credential);

        const token = await auth.currentUser?.getIdToken();
        if (token) {
          const loginInput: IFirebaseLoginInputDto = {
            token: token,
          };
          console.log("token: " + token);

          await userStore.login(loginInput);
        }
      } catch (error) {
        console.error("Xác minh hoặc gửi token đến backend thất bại:", error);
      }
    };

    const handleSendVerifyCode = async (value: any) => {
      const phoneNumberFormatter = `+${value.phoneNumber}`;
      setPhoneNumber(phoneNumberFormatter);
      try {
        const auth = getAuth(firebaseApp);
        if (!(window as any).recaptchaVerifier) {
          (window as any).recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
            }
          );
        }
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumberFormatter,
          (window as any).recaptchaVerifier
        );
        if (confirmationResult && confirmationResult.verificationId) {
          setVerificationId(confirmationResult.verificationId);
          setIsLoggedInStep(true);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const handleBack = () => {
      setIsLoggedInStep(false);
      delete (window as any).recaptchaVerifier;
      const recaptchaContainer = document.getElementById("recaptcha-container");
      recaptchaContainer?.remove();
      const newEl = document.createElement("div");
      newEl.setAttribute("id", "recaptcha-container");
      document.body.appendChild(newEl);
      setVerificationId("");
      setPhoneNumber("");
    };

    return (
      <Col className="min-h-screen min-w-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('@/assets/images/login-bg.png')]">
        <Row className="flex h-[60vh] w-[65vw]">
          <Col
            span={15}
            className="flex justify-center items-center bg-[url('https://media.istockphoto.com/id/1502319014/photo/100-new-us-dollar-bills-on-black-background.webp?b=1&s=170667a&w=0&k=20&c=g7xmJ2HlBg9aJNPoYSGPOF3IFBlWqj3ANXOYVUZ8Qq8=')] bg-center bg-cover bg-no-repeat rounded-l-[13px]"
          >
            <Row className="flex-col items-start gap-4 w-[70%]">
              <div className="flex items-center justify-center gap-[10px]">
                <img src={svgMoneyBag} />
                <h1 className="text-white text-4xl">Money Map</h1>
              </div>
              <h2 className="text-white text-xl font-semibold block">
                Welcome to Monmey Map
              </h2>
              <p className="text-white text-xs leading-[3] tracking-tighter">
                Ridiculus, pellentesque ultricies leo, duis nulla fermentum
                habitant cum lacus porttitor sit posuere convallis netus ante
                varius accumsan a ullamcorper sapien adipiscing, nec. Commodo
                ultricies facilisi sagittis enim potenti vel. Nisi. Nonummy
                tempor platea Cubilia mollis
              </p>
            </Row>
          </Col>
          {isLoggedInStep ? (
            <Col
              span={9}
              className="flex flex-col justify-center gap-3 bg-white p-8 rounded-r-[13px]"
            >
              <div className="flex flex-col gap-[7px]">
                <h1 className="flex flex-col items-center justify-center text-center text-[#111820] font-inter font-bold text-lg leading-[26.533px] tracking-[0.318px]">
                  Confirm your phone
                </h1>
                <div className="flex flex-col self-stretch">
                  <p className="text-xs text-center">
                    Enter OTP code has been sent to {phoneNumber}
                  </p>
                  <p className="min-w-full my-0 mx-auto text-center">
                    {verificationCode}
                  </p>
                </div>
              </div>
              <div className="">
                <Input6VerifyCode onChange={handleVerifyCode} />
              </div>
              <div className="flex items-start gap-4">
                <Button
                  className="w-full px-5 py-4 flex items-center justify-center gap-3 rounded-2xl"
                  onClick={handleBack}
                >
                  <img src={svgbackArrow} />
                  <p>Phone number</p>
                </Button>
                <Button
                  className="w-full  flex items-center justify-center py-4 px-5 rounded-2xl bg-[#27AE60] text-white"
                  onClick={handleVerifyCode}
                >
                  Login
                </Button>
              </div>
              <div className="flex justify-center items-center gap-3">
                <p className="action-title">OTP code sent</p>
                <img src={svgEllipse} style={{ width: "5px", height: "5px" }} />
                <a
                  href="#"
                  className="text-center"
                  style={{ color: "#27AE60" }}
                >
                  Resend
                </a>
              </div>
            </Col>
          ) : (
            <Col
              md={9}
              className="flex justify-center items-center bg-white p-8 rounded-r-[13px]"
            >
              <Form
                onFinish={handleSendVerifyCode}
                className="flex flex-col justify-center items-start gap-5"
              >
                <Row className="flex flex-col justify-center text-3xl text-black">
                  LOGIN
                </Row>
                <Row className="max-w-full">
                  <PhoneInput />
                </Row>
                <Form.Item className="w-[100%] flex items-center justify-center mx-auto py-5">
                  <Button
                    className="w-[100%] bg-[#27AE60] text-white text-center border-none"
                    htmlType="submit"
                  >
                    Next
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          )}
        </Row>
        <div id="recaptcha-container"></div>
      </Col>
    );
  })
);

export default Login;
