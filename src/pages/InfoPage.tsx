import React from "react";
import { useForm } from "react-hook-form";
import MainStructure from "../components/mainStructure";
import FormError from "../components/formError";

interface IFormData {
  placeName: string;
  location: string;
  address: string;
  phoneNum: string;
  homepage: string;

  menu: number;
  menuName: string;
  link: string;
  introduction: string;
  image: File;
  enviornment: string;

  openDate: string;
  specialSupply: string;
  first: string;
  second: string;
  winnerAnnouncement: string;
  receptionStart: string;
  receptionEnd: string;
  contractStart: string;
  contractEnd: string;
}

const OptionPage = () => {
  const { register, handleSubmit, watch, errors } = useForm<IFormData>();

  const onSubmit = (data: string) => console.log(data);

  const handleBasiInfoSubmit = () => {
    console.log("basicInfoSubmit");
  };

  return (
    <MainStructure>
      <>
        <form onSubmit={handleSubmit(handleBasiInfoSubmit)}>
          <div className="infoWrap grid grid-cols-2">
            <div className="firstInfoWrap mt-2 mr-1 bg-white">
              <div className="headerWrap px-5 py-3 bg-gray-700 text-white">
                <h3>01 기본정보</h3>
              </div>
              <div className="basicinfoWrap p-5">
                <div className="inputWrap">
                  <label className="inputLabel">현장명</label>
                  <input
                    name="placeName"
                    className="inputBorder"
                    placeholder="현장명을 입력해 주세요"
                    ref={register({ required: "현장명 입력은 필수입니다." })}
                  />
                  {errors.placeName?.message && <p>현장명 입력 오류입니다 </p>}
                </div>
                <div className="inputWrap">
                  <label className="inputLabel">대지 위치</label>
                  <input
                    name="location"
                    className="inputBorder"
                    placeholder="현장 위치를 입력하세요"
                    ref={register({ required: "위치 입력은 필수입니다." })}
                  />
                  {errors.location?.message && <p>대지 위치 입력 오류입니다</p>}
                </div>
                <div className="inputWrap">
                  <label className="inputLabel">주소</label>
                  <input
                    name="address"
                    className="col-span-6 px-4 py-2 border border-gray-200"
                    placeholder="모델하우스 주소를 입력해 주세요"
                    ref={register({
                      required: "모델하우스 입력은 필수입니다.",
                    })}
                  />
                  {errors.location?.message && (
                    <FormError errorMessage="모델하우스 입력이 잘못되었습니다" />
                  )}
                  <select name="addSelect" className="select ml-1">
                    <option value="모델하우스">모델하우스</option>
                    <option value="option2">option2</option>
                    <option value="option3">option3</option>
                  </select>
                </div>
                <div className="inputWrap">
                  <label className="inputLabel">문의전화</label>
                  <input
                    name="phoneNum"
                    className="inputBorder"
                    placeholder="전화번호를 입력해주세요"
                    ref={register({ required: "전화번호 입력은 필수입니다." })}
                  />
                  {errors.location?.message && <p>전화번호 입력 오류입니다</p>}
                </div>
                <div className="inputWrap">
                  <label className="inputLabel">홈페이지 주소</label>
                  <input
                    name="homepage"
                    className="inputBorder"
                    placeholder="http또는 https를 포함한 홈페이지 주소를 입력해 주세요"
                    ref={register({ required: "홈페이지 입력은 필수입니다." })}
                  />
                  {errors.location?.message && <p>홈페이지 입력 오류입니다</p>}
                </div>
              </div>
              <div className="gray bg-gray-200 h-2"></div>
              <div className="headerWrap flex justify-between items-center px-5 py-3 bg-gray-700 text-white">
                <h3>02 메뉴설정</h3>
              </div>
              <div className="menuWrap p-5">
                <div className="menuNum">
                  <span className="mr-1 p-2 bg-gray-200">01</span>
                  <span className="mr-1 p-2 bg-gray-200">02</span>
                  <span className="mr-1 p-2 bg-gray-200">03</span>
                  <span className="mr-1 p-2 bg-gray-200">04</span>
                  <span className="mr-1 p-2 bg-gray-200">05</span>
                  <span className="mr-1 p-2 bg-gray-200">06</span>
                  <span className="text-gray-200">
                    해당 페이지의 메뉴를 세팅해 주세요
                  </span>
                </div>
                <div className="grid grid-cols-12 mt-4">
                  <select className="select">
                    <option value="option1">option1</option>
                    <option value="option2">option2</option>
                  </select>

                  <label className="col-span-3 mx-2 px-4 py-2 bg-gray-200">
                    메뉴명 입력
                  </label>
                  <input
                    name="menuName"
                    className="col-span-6 px-4 py-2 border border-gray-200"
                    ref={register({ required: "메뉴명 입력은 필수입니다." })}
                  />
                  {errors.menuName?.message && (
                    <FormError errorMessage="메뉴명 입력이 잘못되었습니다" />
                  )}
                </div>
                <div className="grid grid-cols-12 mt-4">
                  <select name="link" className="select">
                    <option value="option1">option1</option>
                    <option value="option2">option2</option>
                  </select>

                  <label className="col-span-3 mx-2 px-4 py-2 bg-gray-200">
                    사업개요
                  </label>
                  <input
                    name="menuName"
                    className="col-span-6 px-4 py-2 border border-gray-200"
                    placeholder="http 혹은 https를 포함한 URL을 입력해 주세요"
                    ref={register({ required: "메뉴명 입력은 필수입니다." })}
                  />
                  {errors.menuName?.message && (
                    <FormError errorMessage="사업개요 입력이 잘못되었습니다" />
                  )}
                </div>
                <div className="grid grid-cols-12 mt-4 items-center">
                  <select className="select">
                    <option value="option1">option1</option>
                    <option value="option2">option2</option>
                  </select>

                  <label className="col-span-3 mx-2 px-4 py-2 bg-gray-200">
                    업체환경
                  </label>
                  <div className="fileUpload col-span-6 grid grid-cols-5">
                    <input
                      name="image"
                      className="col-span-4 border border-gray-200"
                      type="file"
                      onChange={undefined}
                      ref={register({ required: "메뉴명 입력은 필수입니다." })}
                    />
                    {errors.menuName?.message && (
                      <FormError errorMessage="파일 업로드가 실패했습니다" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="dateWrap mt-2 ml-1 bg-white">
              <div className="headerWrap p-3 bg-gray-700 text-white">
                <h3>03 분양일정</h3>
              </div>
              <div className="p-5">
                <div className="inputWrap">
                  <label className="inputLabel">오픈일</label>
                  <input
                    name="openDate"
                    className="inputBorder"
                    placeholder="2021-02-15"
                    ref={register({ required: "오픈일 입력은 필수입니다." })}
                  />
                  {errors.openDate?.message && (
                    <FormError errorMessage="오픈일 입력 오류입니다" />
                  )}
                </div>
                <div className="inputWrap">
                  <label className="inputLabel">특별공급</label>
                  <input
                    name="specialSupply"
                    className="inputBorder"
                    ref={register({ required: "특별공급 입력은 필수입니다." })}
                  />
                  {errors.specialSupply?.message && (
                    <FormError errorMessage="특별공급 입력 오류입니다" />
                  )}
                </div>
                <div className="inputWrap">
                  <label className="inputLabel">1순위</label>
                  <input
                    name="first"
                    className="inputBorder"
                    ref={register({ required: "1순위 입력은 필수입니다." })}
                  />
                  {errors.specialSupply?.message && (
                    <FormError errorMessage="1순위 입력 오류입니다" />
                  )}
                </div>
                <div className="inputWrap">
                  <label className="inputLabel">2순위</label>
                  <input
                    name="first"
                    className="inputBorder"
                    ref={register({ required: "2순위 입력은 필수입니다." })}
                  />
                  {errors.second?.message && (
                    <FormError errorMessage="2순위 입력 오류입니다" />
                  )}
                </div>
                <div className="inputWrap">
                  <label className="inputLabel">당첨자발표</label>
                  <input
                    name="winnerAnnouncement"
                    className="inputBorder"
                    ref={register({
                      required: "당첨자발표 입력은 필수입니다.",
                    })}
                  />
                  {errors.winnerAnnouncement?.message && (
                    <FormError errorMessage="당첨자발표 입력 오류입니다" />
                  )}
                </div>
                <div className="inputWrap">
                  <label className="inputLabel">??접수</label>
                  <input
                    name="receptionStart"
                    className="col-span-4 px-4 py-2 border border-gray-200"
                    ref={register({
                      required: "날짜 입력은 필수입니다.",
                    })}
                  />
                  {errors.receptionStart?.message && (
                    <FormError errorMessage="접수날짜 입력 오류입니다" />
                  )}
                  -
                  <input
                    name="receptionEnd"
                    className="col-span-4 px-4 py-2 border border-gray-200"
                    ref={register({
                      required: "날짜 입력은 필수입니다.",
                    })}
                  />
                  {errors.receptionEnd?.message && (
                    <FormError errorMessage="접수날짜 입력 오류입니다" />
                  )}
                </div>
                <div className="inputWrap">
                  <label className="inputLabel">계약일</label>
                  <input
                    name="contractStart"
                    className="col-span-4 px-4 py-2 border border-gray-200"
                    ref={register({
                      required: "날짜 입력은 필수입니다.",
                    })}
                  />
                  {errors.contractStart?.message && (
                    <FormError errorMessage="계약날짜 입력 오류입니다" />
                  )}
                  -
                  <input
                    name="contractEnd"
                    className="col-span-4 px-4 py-2 border border-gray-200"
                    ref={register({
                      required: "날짜 입력은 필수입니다.",
                    })}
                  />
                  {errors.contractEnd?.message && (
                    <FormError errorMessage="계약날짜 입력 오류입니다" />
                  )}
                </div>
                <div className="inputWRap">
                  <input className="inputBorder w-full" />
                </div>
                <div className="warningWrap text-red-600">
                  <p>* 분양일정의 모든 ~ </p>
                  <p>* 클릭 시 제목과 ~</p>
                </div>
              </div>
            </div>
          </div>
          <div className="buttonsWrap grid grid-cols-6 mt-10">
            <button className="m-1 p-2 col-start-3 col-end-4 bg-gray-700 text-white">
              내용저장
            </button>
            <button className="m-1 p-2 col-start-4 col-end-5 bg-yellow-300">
              테스트
            </button>
          </div>
        </form>
      </>
    </MainStructure>
  );
};

export default OptionPage;
