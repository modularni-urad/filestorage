# filestorage

Servisni sluzba pro management souboru.

Pouziva pro upload [TUS protocol](https://tus.io/).

## settings

Env vars:
- SERVER_SECRET: secret string for JWT decoding
- STORAGE_PATH: subpath, where chunks are stored (default: chunks)
- DATA_FOLDER: folder where are files stored
- HOST & PORT: obvious .. ;) (default: localhost, 1080)