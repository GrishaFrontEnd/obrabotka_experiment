import React, { FC, useState } from "react";
import { IResult } from "./utils/models";
import obj from "./utils/obrabotka";

const App: FC = () => {
  const [value, setValue] = useState<string>("1");
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const [coefStudent, setCoefStudent] = useState<string>("0.95");
  const handleChangeStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoefStudent(e.target.value);
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<number[]>([1]);
  const [resData, setResData] = useState<IResult>({
    Xaver: 1,
    dispersion: 1,
    count: 1,
    data,
    resData: [{ N: 1, x: 1, deviation: 1, sqrtDev: 1 }],
    absErr: 1,
    otnErr: 1,
    kStudent: 0.95,
    averDev: 1,
    dovInter: 1,
  });
  const handleClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const _data: number[] = value.split(" ").map((item) => Number(item));
    setData(_data);
    setResData(obj.getResult(data, +coefStudent));
    setIsOpen(true);
  };
  return (
    <div className="max-w-6xl h-full flex flex-col mx-auto px-5 py-2.5">
      <h1 className="text-3xl font-bold text-center">
        Обработка результатов измерений
      </h1>
      <div className="my-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Экспериментальные данные(значение через пробел)
        </label>
        <input
          className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          value={value}
          onChange={handleChangeInput}
        />
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Коэф Стьюдента
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          value={coefStudent}
          onChange={handleChangeStudent}
        />
        <button
          onClick={handleClickBtn}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-5 mb-2 focus:outline-none"
        >
          Расчет погрешностей
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-center">Результат расчета</h2>
          <div className="my-5">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="py-3 px-6">n</th>
                  <th className="py-3 px-6">x</th>
                  <th className="py-3 px-6">(x-Xср)</th>
                  <th className="py-3 px-6">(x-Xср)^2</th>
                </tr>
              </thead>
              <tbody>
                {resData.resData.map((item, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                      {item.N}
                    </th>
                    <td className="py-4 px-6">{item.x}</td>
                    <td className="py-4 px-6">{item.deviation}</td>
                    <td className="py-4 px-6">{item.sqrtDev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-2xl text-center font-bold">
              Другие результаты обработки
            </h2>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="py-3 px-6">Название атрибута</th>
                  <th className="py-3 px-6">Значение атрибута</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 px-6"></td>
                  <td className="py-4 px-6"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
