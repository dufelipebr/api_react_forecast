'use client';
import Image from "next/image";
import { useState, useEffect } from 'react'


import { get_forecast, sent_comment } from './api';

export default function Home() 
{
  const [dateValue, setDate] = useState()
  const [previsoes, setPrevisoes] = useState([{}])
  const [boolDataLoad, setDataLoaded] = useState(false)
  const [currentPrevisao, setCurrentPrevisao] = useState({})
  const [comment, setComment] = useState("")
  const [message, setMessage] = useState("")


  useEffect(() => {
    if (boolDataLoad == false)     
      LoadData();
    
  }, );

  const LoadData = async () => 
  {
    console.log('LoadData');
    const result = await get_forecast();
    setPrevisoes(result);
    setDataLoaded(true);
    // await Promise.all(
    //   result.map(async (element) => {
    //     console.log(element);
    //   })
    // )

    return result;
  }

  const SentData = async (forecast) => 
  {
    console.log('SentData');
    const result = await sent_comment(forecast);
    setMessage(result);
    //return result;
  }




  const handleChange =  (event) => 
  {
      console.log('handleChange');
      console.log(event.target.value);
      setDate(event.target.value);
      var datePick = previsoes.find((element) => {
        return element.date === event.target.value;
      });
      setCurrentPrevisao(datePick);

  }

  const changeComment = (event) => 
  {
    //console.log('teste');
    //setComment(event.target.value);
  }

  const submit = (event) => 
  {
    // if (comment != "")
    //   currentPrevisao.summary = comment;

    console.log('currentPrevisao');
    console.log(currentPrevisao);
    SentData(currentPrevisao);
    console.log('submit');
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Forecast
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="bg-yellow-700 ">
        <div>
          <select 
            name="combo" 
            id="combo" 
            onChange={handleChange} 
            value={dateValue}
            className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          > 
          {previsoes.map(forecast => 
            <option value={forecast.date}>{forecast.date}</option>
          )}
          </select>
        </div>
       
         <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4">
          Checar as condições:
          <p>{currentPrevisao.summary}</p>
          <p>{currentPrevisao.temperatureC}</p>
          <p>{currentPrevisao.date}</p>
        </div>
        
        <div>
          <p>{message}</p>
          <label>
            Text input: <input name="myInput" 
              className="h-full rounded-md border-1 py-0 pl-4 pr-9 text-gray-700 focus:ring-2 focus:ring-current focus:ring-black sm:text-sm"
            />
          </label>
          <button type="submit" name="enviar" id="enviar" value ="enviar" onClick={submit}
            className="h-full ml-2 bg-red-600 rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
          Confirmar
          </button>

        </div>
        <div className="mt-20"></div>
        
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
