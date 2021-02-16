import React from "react";
import { useForm } from "react-hook-form";
import MainStructure from "../components/mainStructure";
import FormError from "../components/formError";

interface IReservationFormData {
  reservationStart: string;
  reservationEnd: string;
  reservationTime: string;
  peoplePerHour: number;
  unbookableDate: string;
  reservationNotice: string;
}

interface IContractFormData {
  contractStrart: string;
  contractEnd: string;
  contractTime: string;
  contractPeople: number;
  contractUnbookable: string;
  comment: string;
  contractNotice: string;
}
const ReservationPage = () => {
  const { register, handleSubmit, watch, errors } = useForm<
    IReservationFormData,
    IContractFormData
  >();

  const handleReservation = () => {
    console.log("Reservation Submit");
  };

  return (
    <MainStructure>
      <form onSubmit={handleSubmit(handleReservation)}>
        <div className="reservationWrap grid grid-cols-2">
          <div className="visitWrap mt-2 mr-1 bg-white">
            <div className="headerWrap flex justify-between items-center px-5 py-3 bg-gray-700 text-white">
              <h3>01 방문예약</h3>
            </div>
            <div className="contentWrap p-5">
              <div className="inputWrap">
                <label className="inputLabel">예약날짜</label>
                <input
                  name="reservationStart"
                  className="col-span-4 px-4 py-2 border border-gray-200"
                  ref={register({
                    required: "날짜 입력은 필수입니다.",
                  })}
                />
                {errors.reservationStart?.message && (
                  <FormError errorMessage={errors.reservationStart?.message} />
                )}
                -
                <input
                  name="reservationEnd"
                  className="col-span-4 px-4 py-2 border border-gray-200"
                  ref={register({
                    required: "날짜 입력은 필수입니다.",
                  })}
                />
                {errors.reservationEnd?.message && (
                  <FormError errorMessage={errors.reservationEnd?.message} />
                )}
              </div>
              <div className="inputWrap">
                <label className="inputLabel">예약시간</label>
                <input
                  name="reservationTime"
                  className="inputBorder"
                  placeholder="예 10:30| 11:00 | 11:30  "
                  ref={register({ required: "예약시간 입력은 필수입니다." })}
                />
                {errors.reservationTime?.message && (
                  <FormError errorMessage={errors.reservationTime?.message} />
                )}
              </div>
              <div className="inputWrap">
                <label className="inputLabel">시간당 인원수</label>
                <input
                  name="peoplePerHour"
                  className="inputBorder"
                  placeholder="숫자만 입력하십시오"
                  ref={register({ required: "인원수 입력은 필수입니다." })}
                />
                {errors.peoplePerHour?.message && (
                  <FormError errorMessage={errors.peoplePerHour.message} />
                )}
              </div>
              <div className="inputWrap">
                <label className="inputLabel">예약불가 날짜</label>
                <input
                  name="phoneNum"
                  className="inputBorder"
                  placeholder="2021-11-11\2023-11-12"
                  ref={register({ required: "전화번호 입력은 필수입니다." })}
                />
                {errors.unbookableDate?.message && (
                  <FormError errorMessage={errors.unbookableDate?.message} />
                )}
              </div>
              <div className="inputWrap">
                <label className="inputLabel">예약일정 알림</label>
                <input
                  name="reservationNotice"
                  className="inputBorder"
                  placeholder="당첨알림 내용"
                  ref={register({ required: "전화번호 입력은 필수입니다." })}
                />
                {errors.reservationNotice?.message && (
                  <FormError errorMessage={errors.reservationNotice?.message} />
                )}
              </div>
            </div>
          </div>
          <div className="alarmtalkSendWrap mt-2 ml-1 bg-white">
            <div className="headerWrap p-3 bg-gray-700 text-white">
              <h3>02 계약자 전용 방문예약</h3>
            </div>
          </div>
        </div>
        <div className="buttonsWrap grid grid-cols-5 mt-10">
          <button className="m-1 p-2 col-start-3 col-end-4 bg-gray-700 text-white">
            내용저장
          </button>
        </div>
      </form>
    </MainStructure>
  );
};

export default ReservationPage;
