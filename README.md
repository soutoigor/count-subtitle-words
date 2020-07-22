# Count subtitle words

An API to upload `.srt` files and see how many times each word has been said in all subtitle files.

I've created this project to test the [RxJS](https://rxjs-dev.firebaseapp.com/) library and its concepts.  
You can use it with the hosted API URL: `https://count-subtitle-words.herokuapp.com`

## Setup

> Install dependencies

```
npm install
```

> Run in development mode

```
npm run dev
```

> Run project 

```
npm run start
```

## Usage

> Upload the files and see the words count
```
POST /count_subtitles
```
And send the body as `form-data`: 
```
{ "subtitles": [files] }
```

> The return should be like:

```
{
    "count": [
        {
            "word": "you",
            "quantity": 397
        },
        {
            "word": "to",
            "quantity": 345
        },
        {
            "word": "the",
            "quantity": 314
        },
        ....
    ]
}
```
## Technologies

- [NodeJS](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/pt-br/api.html)
- [RxJS](https://rxjs-dev.firebaseapp.com/)
- [Multer](https://github.com/expressjs/multer)
