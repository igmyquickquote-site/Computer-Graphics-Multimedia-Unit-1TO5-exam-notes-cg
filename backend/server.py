from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
from pathlib import Path
import os
import logging

from content_unit1 import UNIT_1

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.units.replace_one({"unit_id": UNIT_1["unit_id"]}, UNIT_1, upsert=True)
    logger.info("Unit 1 content seeded")
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {"message": "CG Revision Booklet API"}


@api_router.get("/units")
async def list_units():
    return await db.units.find(
        {}, {"_id": 0, "unit_id": 1, "unit_number": 1, "title": 1, "subtitle": 1, "subject": 1}
    ).to_list(50)


@api_router.get("/units/{unit_id}")
async def get_unit(unit_id: str):
    unit = await db.units.find_one({"unit_id": unit_id}, {"_id": 0})
    if not unit:
        raise HTTPException(status_code=404, detail="Unit not found")
    return unit


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
