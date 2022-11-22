import nextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import Adapters from 'next-auth/adapters';
import CredentialsProvider from "next-auth/providers/credentials"; // async이다.
import GoogleProvider from "next-auth/providers/google"
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

export const authOptions :NextAuthOptions= {
    // pages : {
    //   error : "/auth/error",
      
    // },
    providers: [
        CredentialsProvider({
            credentials: {
              email: {},
              password: {}
            },
            // ===== 인증을 어떻게 처리할 지 구현하는 함수 (필수) =====
            async authorize(credentials, req) {
              // console.log("nextauth credentials : ",credentials) // credentials 로 정보가 들어온다.
              try{
                // console.log(process.env.NEXT_PUBLIC_SERVER_URI )
                const rcv = await fetch(
                  process.env.NEXT_PUBLIC_SERVER_URI + "/api/account/signin",
                  {
                    method: "post",
                    body: JSON.stringify(credentials),
                    headers: { "Content-type": "application/json" },
                  }
                );
                const data = await rcv.json();
                // console.log("authorize", `${data.datas.secondname} ${data.datas.firstname}`)
                if(data.result == true){
                  return {email : data.datas.email, name : `${data.datas.secondname} ${data.datas.firstname}`} as any;
                }else{
                  return null;
                }
  
                
              }catch(e:any){
                console.log("auth credentials", e.message)
              }
            }
          })
        ,
        GoogleProvider ({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
        ,
        KakaoProvider({
          clientId: process.env.KAKAO_CLIENT_ID as string,
          clientSecret: process.env.KAKAO_CLIENT_SECRET as string
        }),
        NaverProvider({
          clientId: process.env.NAVER_CLIENT_ID as string,
          clientSecret: process.env.NAVER_CLIENT_SECRET as string
        })
        
    ],
    // adapter: Adapters.Prisma.Adapter({ prisma }),
    callbacks : {
      async signIn(params) {
        if(params.profile){
          // console.log("signIn ============================================",process.env.SERVER_URI);
          // console.log(params);
          try {
            // let tttrcv = await fetch(`${process.env.SERVER_URI}/api/account/accountchk`,{
              let tttrcv = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/account/accountchk`,{
              method:"post",
              body : JSON.stringify(params),
              headers : {
                "content-type" : "application/json"
              }
            })
            const calrcv  = await tttrcv.json();
            // console.log(calrcv);
            if(calrcv.result){
              return true
            }else{
              // return `/auth/error?type=noUser&email=${calrcv.datas.email}`
              return true
            }

          }catch(e:any){
            console.log("auth callbacks err", e.message)

          }
          
        }else{
        }
        return true
      }
    }
  }
  
export default nextAuth(authOptions);