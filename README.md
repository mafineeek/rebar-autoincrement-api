# Rebar AutoIncrement API
Basic Rebar framework API that utilizes simplier, int number ids rather than ObjectIds.

## Usage
```ts
const api = Rebar.useApi(); //Get Rebar API manager
let aiApi = api.get('autoincrement-api'); //Get loaded Autoincrement API
const saveDocument = async() => {
    await database.create({
        uid: await aiApi.getNextIdForCollection('MyNewCollection'), //Get next ID & auto update it.
        hello: 'world!'
    }, 'MyNewCollection')
}
```

<img src="https://i.imgur.com/m8CvJLP.png" />
<i>Example from my private script, showing how it works on Vehicles collection</i>

## Installation

From the main directory of your `Rebar` installation.

```
git clone [https://github.com/mafineeek/rebar-basic-animations-menu](https://github.com/mafineeek/rebar-autoincrement-api) src/plugins/autoincrement-api
```
