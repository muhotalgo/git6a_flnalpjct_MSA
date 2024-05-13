from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

import uvicorn

import database as sess
# from routes import member
from api.routes import member


# from fastapi.templating import Jinja2Templates
# templates = Jinja2Templates(directory='../msa-frontend')

# TailwindCSS
#app.mount("/static", StaticFiles(directory='views/static'), name='static')


app = FastAPI()
instrumentator = Instrumentator()
instrumentator.instrument(app).expose(app)

# CORS 설정
origins = [
    "http://52.79.137.65:32321",  # 허용할 프론트엔드 도메인
    "http://52.79.137.65:32321",
    "http://52.79.137.65:30742"

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    #allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터베이스 세션 의존성 생성
def get_db():
    db = sess.SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.include_router(member.router)


if __name__ == '__main__':
    sess.create_tables()
    uvicorn.run('main:app', host="0.0.0.0", port=8030, reload=True)
