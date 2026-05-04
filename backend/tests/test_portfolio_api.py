"""Backend API tests for the Osama Portfolio (FastAPI + Mongo)."""
import os
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else None
if not BASE_URL:
    # fallback - read from frontend env
    from pathlib import Path
    env_path = Path("/app/frontend/.env")
    for line in env_path.read_text().splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
            break

API = f"{BASE_URL}/api"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ----- Root health -----
class TestRoot:
    def test_root_ok(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "message" in data


# ----- Contact CRUD -----
class TestContact:
    def test_create_contact_and_persists_without_objectid(self, api_client):
        payload = {
            "name": "TEST_Pytest_User",
            "email": "pytest_user@example.com",
            "subject": "Automated Test",
            "message": "Hello from pytest – this is a test submission",
        }
        r = api_client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        # field checks
        for k in ("id", "name", "email", "subject", "message", "created_at"):
            assert k in data, f"missing {k}"
        assert "_id" not in data, "Response must not include Mongo _id"
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["subject"] == payload["subject"]
        assert data["message"] == payload["message"]
        assert isinstance(data["id"], str) and len(data["id"]) > 0

        # verify persistence via GET /contact
        r2 = api_client.get(f"{API}/contact")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        assert any(it.get("id") == data["id"] for it in items), "Created contact not found in list"
        for it in items:
            assert "_id" not in it, "List items must not include Mongo _id"

    def test_list_sorted_desc(self, api_client):
        # insert two with timing gap
        a = api_client.post(f"{API}/contact", json={
            "name": "TEST_Sort_A", "email": "a@example.com", "subject": "s", "message": "first"
        })
        b = api_client.post(f"{API}/contact", json={
            "name": "TEST_Sort_B", "email": "b@example.com", "subject": "s", "message": "second"
        })
        assert a.status_code == 200 and b.status_code == 200
        items = api_client.get(f"{API}/contact").json()
        # find indices
        ids = [it["id"] for it in items]
        assert ids.index(b.json()["id"]) < ids.index(a.json()["id"]), "Latest should appear first (desc)"

    def test_invalid_email(self, api_client):
        r = api_client.post(f"{API}/contact", json={
            "name": "TEST_Invalid_Email",
            "email": "not-an-email",
            "subject": "x",
            "message": "body",
        })
        assert r.status_code == 422

    def test_missing_name(self, api_client):
        r = api_client.post(f"{API}/contact", json={
            "email": "x@x.com", "subject": "s", "message": "m"
        })
        assert r.status_code == 422

    def test_missing_message(self, api_client):
        r = api_client.post(f"{API}/contact", json={
            "name": "TEST_No_Msg", "email": "x@x.com", "subject": "s"
        })
        assert r.status_code == 422

    def test_empty_message(self, api_client):
        r = api_client.post(f"{API}/contact", json={
            "name": "TEST_Empty", "email": "x@x.com", "subject": "s", "message": ""
        })
        assert r.status_code == 422


# ----- Status regression -----
class TestStatus:
    def test_create_and_list_status(self, api_client):
        r = api_client.post(f"{API}/status", json={"client_name": "TEST_pytest_status"})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["client_name"] == "TEST_pytest_status"
        assert "id" in data and "timestamp" in data
        assert "_id" not in data

        r2 = api_client.get(f"{API}/status")
        assert r2.status_code == 200
        arr = r2.json()
        assert isinstance(arr, list)
        assert any(x.get("client_name") == "TEST_pytest_status" for x in arr)
        for x in arr:
            assert "_id" not in x
