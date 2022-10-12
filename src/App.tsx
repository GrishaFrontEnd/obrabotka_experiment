import React, { FC, useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { IResult } from "./utils/models";
import obj from "./utils/obrabotka";

const App: FC = () => {
  const [value, setValue] = useState<string>("1");
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const _data: number[] = value.split(" ").map((item) => Number(item));
    setData(_data);
    setResData(obj.getResult(data, +coefStudent));
  };
  const [coefStudent, setCoefStudent] = useState<string>("0.95");
  const handleChangeStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoefStudent(e.target.value);
    const _data: number[] = value.split(" ").map((item) => Number(item));
    setData(_data);
    setResData(obj.getResult(data, +coefStudent));
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
    averMathAverDev: 1,
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
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-bold text-center my-3">
            Результат расчёта
          </h2>
          <div className="text-xl w-full">
            <>
              1. Математическое ожидание X = {`(`}
              {data.map((_, index) => {
                return index !== data.length - 1
                  ? `X${index + 1}` + "+"
                  : `X${index + 1}`;
              })}
              {`)/N`} = {"("}
              {data.map((item, index) => {
                return index !== data.length - 1 ? `${item}` + "+" : `${item}`;
              })}
              {`)/${data.length}`} = {resData.Xaver}
            </>
            <br className="my-3" />
            <div className="my-5 mx-auto">
              <table className="text-sm text-left text-gray-500 mx-auto">
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
            <>
              2. Средняя квадратичная ошибка S = (Σ(X - Xi)^(0.5)/(n-1))^(1/2) =
              {" ("}
              {data.map((_, index) => {
                return index !== data.length - 1
                  ? `(X${index + 1}-X)^2` + "+"
                  : `(X${index + 1}-X)^2`;
              })}
              {`)/${data.length - 1}`}= {"("}
              {data.map((item, index) => {
                return index !== data.length - 1
                  ? `(${item}-${resData.Xaver})^2+`
                  : `(${item}-${resData.Xaver})^2`;
              })}
              {`)/${data.length}`} = {resData.averDev}
            </>
            <br className="my-3" />
            <>
              3. Средняя арифметическая средней квадратичной Sx = S/(n)^1/2 ={" "}
              {`${resData.averDev}/${resData.count ** 0.5}`} ={" "}
              {resData.averMathAverDev}
            </>
            <br className="my-3" />
            <>
              4. Вычисляем доверительный интервал(абсолютная погрешность
              измерений) deltaX = Sx * t = {resData.averMathAverDev} *{" "}
              {resData.kStudent}
            </>
            <br className="my-3" />
            <>
              5. Окончательный результат в виде X = Xср ± Δ = {resData.Xaver} ±{" "}
              {resData.absErr}
            </>
            <br className="my-3" />
            <>
              6. Относительная погрешность измерений ε = (Δ/X)*100% ={" "}
              {resData.absErr}/{resData.Xaver}*100%={resData.otnErr}%
            </>
          </div>
          <div>
            <h2 className="text-2xl my-5 text-center font-bold">
              Другие результаты обработки
            </h2>
          </div>
          <div>
            <h3 className="text-2xl font-bold my-5">Распределение Гаусса</h3>
            <div className="mt-5">
              <LineChart
                width={600}
                height={600}
                data={obj.getGaussArray(
                  +data.length,
                  Math.min(...data),
                  Math.max(...data)
                )}
              >
                <Line type="monotone" stroke="#8884d8" dataKey={"y"} />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
