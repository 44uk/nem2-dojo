# アカウント情報

これまでアカウントの情報は`nem2-cli`を使って取得していました。

ここではコードも用いて情報の取得をしてみましょう。


## アカウント情報の取得

`account/fetch_account_info.js`を実行してください。

```shell
$ node account/fetch_account_info.js
AccountInfo {
  meta:
   AccountMetaDTO {
     height: undefined,
     hash: undefined,
     merkleComponentHash: undefined,
     index: undefined,
     id: undefined },
  address:
   Address {
     address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
     networkType: 144 },
  addressHeight: UInt64 { lower: 298, higher: 0 },
  publicKey:
   'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
  publicKeyHeight: UInt64 { lower: 382, higher: 0 },
  mosaics:
   [ Mosaic {
       id:
        MosaicId { id: Id { lower: 2100741038, higher: 1065721635 } },
       amount: UInt64 { lower: 2471032704, higher: 1 } },
     Mosaic {
       id: MosaicId { id: Id { lower: 2950193148, higher: 191824161 } },
       amount: UInt64 { lower: 3000, higher: 0 } },
     Mosaic {
       id: MosaicId { id: Id { lower: 1557790320, higher: 326653477 } },
       amount: UInt64 { lower: 2990, higher: 0 } },
     Mosaic {
       id: MosaicId { id: Id { lower: 538523231, higher: 700909375 } },
       amount: UInt64 { lower: 1000, higher: 0 } },
     Mosaic {
       id: MosaicId { id: Id { lower: 149426422, higher: 1878724419 } },
       amount: UInt64 { lower: 10000, higher: 0 } },
     [length]: 5 ],
  importance: UInt64 { lower: 0, higher: 0 },
  importanceHeight: UInt64 { lower: 0, higher: 0 } }
```

アカウントに関する情報が取得できました。

保有するモザイクも含まれます。

しかしこの情報にはモザイクIDと絶対値の保有量しか含まれておらず、可分性による相対的な量を計算することができません。


### コード解説

`Address`オブジェクトを作ったら、`AccountHttp#getAccountInfo`メソッドに渡して購読を開始することでアカウント情報のオブジェクトが取得できます。

```javascript
accountHttp.getAccountInfo(address)
  .subscribe(accountInfoView => {
    console.log('%o', accountInfoView);
  })
;
```

しかし、このメソッドだけではモザイクごとの詳細な情報は含まれていません。


## 保有モザイクの定義情報の取得

`account/fetch_owned_mosaics.js`を実行してください。

```shell
$ node account/fetch_owned_mosaics.js SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4
[ MosaicAmountView {
    mosaicInfo:
     MosaicInfo {
       metaId: '5D1EC31E7C54F97DF5C5054C',
       mosaicId:
        MosaicId { id: Id { lower: 2100741038, higher: 1065721635 } },
       supply: UInt64 { lower: 4130794368, higher: 2095242 },
       height: UInt64 { lower: 1, higher: 0 },
       owner:
        PublicAccount {
          publicKey:
           '9143A4162BFF23F9D51F5DB2B17768E57249E5F0DBC202D13905326BBCC94FA0',
          address:
           Address {
             address: 'SCWV6WBU72MDT2RF2IZLBES74CIAOPLYG6GR5U4U',
             networkType: 144 } },
       revision: 1,
       properties:
        MosaicProperties {
          divisibility: 6,
          duration: UInt64 { lower: 0, higher: 0 },
          supplyMutable: false,
          transferable: true } },
    amount: UInt64 { lower: 2471032704, higher: 1 } },
  MosaicAmountView {
    mosaicInfo:
     MosaicInfo {
       metaId: '5D1EFEFB7C54F97DF5C534C1',
       mosaicId: MosaicId { id: Id { lower: 2950193148, higher: 191824161 } },
       supply: UInt64 { lower: 3000, higher: 0 },
       height: UInt64 { lower: 1026, higher: 0 },
       owner:
        PublicAccount {
          publicKey:
           'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
          address:
           Address {
             address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
             networkType: 144 } },
       revision: 1,
       properties:
        MosaicProperties {
          divisibility: 0,
          duration: UInt64 { lower: 100, higher: 0 },
          supplyMutable: true,
          transferable: true } },
    amount: UInt64 { lower: 3000, higher: 0 } },
  MosaicAmountView {
    mosaicInfo:
     MosaicInfo {
       metaId: '5D1EF48F7C54F97DF5C52C0F',
       mosaicId: MosaicId { id: Id { lower: 538523231, higher: 700909375 } },
       supply: UInt64 { lower: 1000, higher: 0 },
       height: UInt64 { lower: 844, higher: 0 },
       owner:
        PublicAccount {
          publicKey:
           'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
          address:
           Address {
             address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
             networkType: 144 } },
       revision: 1,
       properties:
        MosaicProperties {
          divisibility: 0,
          duration: UInt64 { lower: 0, higher: 0 },
          supplyMutable: true,
          transferable: true } },
    amount: UInt64 { lower: 1000, higher: 0 } },
  MosaicAmountView {
    mosaicInfo:
     MosaicInfo {
       metaId: '5D1F53CF7C54F97DF5C572A5',
       mosaicId: MosaicId { id: Id { lower: 1557790320, higher: 326653477 } },
       supply: UInt64 { lower: 3000, higher: 0 },
       height: UInt64 { lower: 2344, higher: 0 },
       owner:
        PublicAccount {
          publicKey:
           'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
          address:
           Address {
             address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
             networkType: 144 } },
       revision: 1,
       properties:
        MosaicProperties {
          divisibility: 0,
          duration: UInt64 { lower: 100, higher: 0 },
          supplyMutable: true,
          transferable: true } },
    amount: UInt64 { lower: 2990, higher: 0 } },
  MosaicAmountView {
    mosaicInfo:
     MosaicInfo {
       metaId: '5D1EF1CE7C54F97DF5C52988',
       mosaicId: MosaicId { id: Id { lower: 149426422, higher: 1878724419 } },
       supply: UInt64 { lower: 10000, higher: 0 },
       height: UInt64 { lower: 788, higher: 0 },
       owner:
        PublicAccount {
          publicKey:
           'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
          address:
           Address {
             address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
             networkType: 144 } },
       revision: 1,
       properties:
        MosaicProperties {
          divisibility: 0,
          duration: UInt64 { lower: 10000, higher: 0 },
          supplyMutable: true,
          transferable: true } },
    amount: UInt64 { lower: 10000, higher: 0 } },
  [length]: 5 ]
```

今度は保有しているモザイクとその詳細な定義情報を取得しました。

`MosaicService`というサービスクラスを用いることで、アカウントが保有するモザイク情報の詳細を取得できます。


## アカウント情報と保有モザイク情報を同時に取得

`fetch_account_info_with_mosaics.js`を実行してください。

これは`rxjs`の応用による、その2つをあわせて扱う場合のコードです。

このコードはアドレスの保有するモザイクを定義情報付きで取得します。

```shell
$ node account/fetch_account_info_with_mosaics.js
AccountInfo {
  meta:
   AccountMetaDTO {
     height: undefined,
     hash: undefined,
     merkleComponentHash: undefined,
     index: undefined,
     id: undefined },
  address:
   Address {
     address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
     networkType: 144 },
  addressHeight: UInt64 { lower: 298, higher: 0 },
  publicKey:
   'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
  publicKeyHeight: UInt64 { lower: 382, higher: 0 },
  mosaics:
   [ Mosaic {
       id:
        MosaicId { id: Id { lower: 2100741038, higher: 1065721635 } },
       amount: UInt64 { lower: 2471032704, higher: 1 } },
     Mosaic {
       id: MosaicId { id: Id { lower: 2950193148, higher: 191824161 } },
       amount: UInt64 { lower: 3000, higher: 0 } },
     Mosaic {
       id: MosaicId { id: Id { lower: 1557790320, higher: 326653477 } },
       amount: UInt64 { lower: 2990, higher: 0 } },
     Mosaic {
       id: MosaicId { id: Id { lower: 538523231, higher: 700909375 } },
       amount: UInt64 { lower: 1000, higher: 0 } },
     Mosaic {
       id: MosaicId { id: Id { lower: 149426422, higher: 1878724419 } },
       amount: UInt64 { lower: 10000, higher: 0 } },
     [length]: 5 ],
  importance: UInt64 { lower: 0, higher: 0 },
  importanceHeight: UInt64 { lower: 0, higher: 0 } }
[ MosaicAmountView {
    mosaicInfo:
     MosaicInfo {
       metaId: '5D1F53CF7C54F97DF5C572A5',
       mosaicId: MosaicId { id: Id { lower: 1557790320, higher: 326653477 } },
       supply: UInt64 { lower: 3000, higher: 0 },
       height: UInt64 { lower: 2344, higher: 0 },
       owner:
        PublicAccount {
          publicKey:
           'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
          address:
           Address {
             address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
             networkType: 144 } },
       revision: 1,
       properties:
        MosaicProperties {
          divisibility: 0,
          duration: UInt64 { lower: 100, higher: 0 },
          supplyMutable: true,
          transferable: true } },
    amount: UInt64 { lower: 2990, higher: 0 } },
  MosaicAmountView {
    mosaicInfo:
     MosaicInfo {
       metaId: '5D1EC31E7C54F97DF5C5054C',
       mosaicId:
        MosaicId { id: Id { lower: 2100741038, higher: 1065721635 } },
       supply: UInt64 { lower: 4130794368, higher: 2095242 },
       height: UInt64 { lower: 1, higher: 0 },
       owner:
        PublicAccount {
          publicKey:
           '9143A4162BFF23F9D51F5DB2B17768E57249E5F0DBC202D13905326BBCC94FA0',
          address:
           Address {
             address: 'SCWV6WBU72MDT2RF2IZLBES74CIAOPLYG6GR5U4U',
             networkType: 144 } },
       revision: 1,
       properties:
        MosaicProperties {
          divisibility: 6,
          duration: UInt64 { lower: 0, higher: 0 },
          supplyMutable: false,
          transferable: true } },
    amount: UInt64 { lower: 2471032704, higher: 1 } },
  MosaicAmountView {
    mosaicInfo:
     MosaicInfo {
       metaId: '5D1EFEFB7C54F97DF5C534C1',
       mosaicId: MosaicId { id: Id { lower: 2950193148, higher: 191824161 } },
       supply: UInt64 { lower: 3000, higher: 0 },
       height: UInt64 { lower: 1026, higher: 0 },
       owner:
        PublicAccount {
          publicKey:
           'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
          address:
           Address {
             address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
             networkType: 144 } },
       revision: 1,
       properties:
        MosaicProperties {
          divisibility: 0,
          duration: UInt64 { lower: 100, higher: 0 },
          supplyMutable: true,
          transferable: true } },
    amount: UInt64 { lower: 3000, higher: 0 } },
  MosaicAmountView {
    mosaicInfo:
     MosaicInfo {
       metaId: '5D1EF48F7C54F97DF5C52C0F',
       mosaicId: MosaicId { id: Id { lower: 538523231, higher: 700909375 } },
       supply: UInt64 { lower: 1000, higher: 0 },
       height: UInt64 { lower: 844, higher: 0 },
       owner:
        PublicAccount {
          publicKey:
           'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
          address:
           Address {
             address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
             networkType: 144 } },
       revision: 1,
       properties:
        MosaicProperties {
          divisibility: 0,
          duration: UInt64 { lower: 0, higher: 0 },
          supplyMutable: true,
          transferable: true } },
    amount: UInt64 { lower: 1000, higher: 0 } },
  MosaicAmountView {
    mosaicInfo:
     MosaicInfo {
       metaId: '5D1EF1CE7C54F97DF5C52988',
       mosaicId: MosaicId { id: Id { lower: 149426422, higher: 1878724419 } },
       supply: UInt64 { lower: 10000, higher: 0 },
       height: UInt64 { lower: 788, higher: 0 },
       owner:
        PublicAccount {
          publicKey:
           'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
          address:
           Address {
             address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
             networkType: 144 } },
       revision: 1,
       properties:
        MosaicProperties {
          divisibility: 0,
          duration: UInt64 { lower: 10000, higher: 0 },
          supplyMutable: true,
          transferable: true } },
    amount: UInt64 { lower: 10000, higher: 0 } },
  [length]: 5 ]
```

`MosaicAmountView`でラップされたオブジェクトには`relativeAmount()`というメソッドが用意されているので、これを実行することで相対量を取得することが出来ます。

他にも`mosaicInfo`プロパティに定義情報が含まれているので、必要に応じて利用することが出来ます。


### コード解説

`MosaicService`というサービスクラスを用いることで、アカウントが保有するモザイク情報の詳細を取得できます。

```javascript
const accountHttp = new AccountHttp(url);
const mosaicHttp = new MosaicHttp(url);
const mosaicService = new MosaicService(accountHttp, mosaicHttp);

// アカウント情報と保有モザイク情報を組み合わせる
accountHttp.getAccountInfo(address)
  .pipe(
    mergeMap(account => mosaicService.mosaicsAmountViewFromAddress(account.address)
      .pipe(
        mergeMap(_ => _),
        toArray(),
        map(mosaics => ({ account, mosaics }))
      ),
    )
  )
;
```

使用するメソッドは前述の2つのコードでもでてきた`AccountHttp#getAccountInfo`と`MosaicService#AmountViewFromAddress`です。

`rxjs`の`pipe`メソッドを使い、ストリームを流れてきたアカウント情報を、より内側のモザイク情報の取得結果のタイミングで組み合わせ、最終的に`subscribe`で取得するような流れを作っています。


## トランザクションの取得

アカウントに関するトランザクションのAPIは、公開鍵を指定することで取得することが出来ます。

`account/fetch_transactions.js`を実行します。

このスクリプトは受信トランザクション、送信トランザクション、未承認トランザクションそれぞれをまとめて取得します。

第一引数に取得したいアドレスの公開鍵を渡して実行します。

```shell
$ node account/fetch_transactions.js A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0
{ incomings:
   [ TransferTransaction {
       type: 16724,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        'ED062030C4AC308AE04B5CA4BA9837C4B80BE2C409E33655C91D6A1EDF44D2CED020F34F7BB6F89078B0657A22BE9AB93A9CF744B4A271FE255F975609018D07',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       recipient: [Address],
       mosaics: [Array],
       message: [PlainMessage] } ],
  outgoings:
   [ AggregateTransaction {
       type: 16961,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '85D7725C57F09367674433BA24E08776E192964C6010EE667EEFCA15244A24DD14CEBE583F65C6A7EBA2E54015C71E974CE2E2DDE55966E96DF451E01BB5A50D',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       innerTransactions: [Array],
       cosignatures: [Array] },
     LockFundsTransaction {
       type: 16712,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '70CAFABF2DECBBFD2AC05C627D970BD55542F0F5D3CAB16DD191C33DD6BE2DD458716C82E34EA009E30F94BF329829B10B75F1F6426751403057398A31111F0A',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       mosaic: [Mosaic],
       duration: [UInt64],
       hash:
        'AD5CF560AE6A7993D0524EF766E220E7570F6BAE11F4D6C64A3D2036A670C02B' },
     TransferTransaction {
       type: 16724,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        'AE8A849CBB33A15989BA93C83D0A1254CCEC84F31FB043E77D015F97E02C481E84CF223DA160EE8D668C084AD83120307E26D85CF106C5C0DF75FFC51CC50200',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       recipient: [Address],
       mosaics: [Array],
       message: [PlainMessage] },
     AggregateTransaction {
       type: 16705,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '5BA85768764CFFEB19B2641DB5D2E28A244BE78604602DD45DBE1ECBF57A491CC472F4E7F2A611ECDE3D349526D49E57D2A273DA2A71D63EB7C9FF476D5A560D',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       innerTransactions: [Array],
       cosignatures: [] },
     SecretProofTransaction {
       type: 16978,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '73E6840755C132F1EBFF7DC6040EAA0903F6F73AF657201A092F4ECA2DEADE8759F0F1554E4D27F16FE23CC01FF94A3F018879901D72BE76AD2DE9589D0E4904',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       hashType: 0,
       secret:
        '53911BA20016A8C927EEDC50E456E76F2F84C5BEABACB9ADF224E23B964D8573',
       recipient: '9093BBB2C844D33E8D05CE150D7EA34630A056E800189B795A',
       proof:
        '414C4C5F594F55525F424153455F4152455F42454C4F4E475F544F5F5553' },
     SecretLockTransaction {
       type: 16722,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        'FA800AF3C510EC842526F1EDB64964010A80F5BCF250237B5623ABB904822BE2DF2FC0FD9F813FE3A4B6E09807EB874B1CA5EF7FE7C8694D01DA0C447434A70E',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       mosaic: [Mosaic],
       duration: [UInt64],
       hashType: 0,
       secret:
        '53911BA20016A8C927EEDC50E456E76F2F84C5BEABACB9ADF224E23B964D8573',
       recipient: [Address] },
     ModifyAccountPropertyEntityTypeTransaction {
       type: 17232,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '3C77EB88AF67419D18290AE5F976068A64E213894A10FE881D510A3B484BA1343C705E02497706EE590FB87156F9CF91D36A8CC9A1620BD197D9DDC79B52C607',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       propertyType: undefined,
       modifications: [Array] },
     ModifyAccountPropertyEntityTypeTransaction {
       type: 17232,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '076289FAE8AE9586D683986D1A2B500B352F8729A538C54C56AF43056CED91DEA45EA412A14BFC6089A844B67056D7CAF3ABAD907A68DDDAB4BF96C1FCC3B808',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       propertyType: undefined,
       modifications: [Array] },
     ModifyAccountPropertyMosaicTransaction {
       type: 16976,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '3FB5417781930742AF781E1CD706C83C4BD13241537A46A1DF96D355475CB767E194B5A00353C5C7D9162EF199E35EC069FDED6CABBC9B8074210A4238B9A009',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       propertyType: undefined,
       modifications: [Array] },
     ModifyAccountPropertyMosaicTransaction {
       type: 16976,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '8077CEF0701215D2CE6B5887C9DFFA4D11420DEEE7DE408B3FE5414C9C35855B480CDB0B97E158AB2741A2F461D5AAAC8BAA250EE3588AAE6BDC8B1CC6AE920A',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       propertyType: undefined,
       modifications: [Array] } ],
  unconfirmed: [] }
```


### コード解説

`AccountHttp#incomingTransactions`等のメソッドに`PublicAccount`オブジェクトを渡して購読すると情報を取得できます。

```javascript
forkJoin([
  accountHttp.incomingTransactions(publicAccount),
  accountHttp.outgoingTransactions(publicAccount),
  accountHttp.unconfirmedTransactions(publicAccount)
]).pipe(
  map(results => {
    const [ incomings, outgoings, unconfirmed ] = results;
    return { incomings, outgoings, unconfirmed };
  })
).subscribe(
  data => console.log(data)
);
```

今回は`RxJS`の`forkJoin`を用いて受信・送信・未承認をまとめて取得し、トランザクション情報配列をオブジェクトの形にまとめて`subject`へ流しています。


## アドレスからトランザクションを取得する

アドレスを指定してトランザクションを取得したい場合もあると思います。

リクエスト回数やコードが若干複雑化しますが、アカウント情報から公開鍵を取得し、その公開鍵でトランザクションを取得するコードを用意しました。

`fetch_transactions_by_address.js`を実行します。

ただし、アカウント情報から取得できる公開鍵は、トランザクションをアナウンスして(送信して)初めてネットワーク上に現れます。

そのため受信トランザクションしかない場合は公開鍵がネットワーク上に現れないため、アカウント情報から公開鍵を取得することができません。

(現状の仕様では`0000000000000000000000000000000000000000000000000000000000000000`という値が返ってきます。)

公開鍵が晒されていないアカウントの受信トランザクションを取得したい場合は公開鍵を直接指定するしかありません。

```shell
$ node account/fetch_transactions.js SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4
{ account:
   AccountInfo {
     meta:
      AccountMetaDTO {
        height: undefined,
        hash: undefined,
        merkleComponentHash: undefined,
        index: undefined,
        id: undefined },
     address:
      Address {
        address: 'SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4',
        networkType: 144 },
     addressHeight: UInt64 { lower: 298, higher: 0 },
     publicKey:
      'A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0',
     publicKeyHeight: UInt64 { lower: 382, higher: 0 },
     mosaics: [ [Mosaic], [Mosaic], [Mosaic], [Mosaic], [Mosaic] ],
     importance: UInt64 { lower: 0, higher: 0 },
     importanceHeight: UInt64 { lower: 0, higher: 0 } },
  incomings:
   [ TransferTransaction {
       type: 16724,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        'ED062030C4AC308AE04B5CA4BA9837C4B80BE2C409E33655C91D6A1EDF44D2CED020F34F7BB6F89078B0657A22BE9AB93A9CF744B4A271FE255F975609018D07',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       recipient: [Address],
       mosaics: [Array],
       message: [PlainMessage] } ],
  outgoings:
   [ AggregateTransaction {
       type: 16961,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '85D7725C57F09367674433BA24E08776E192964C6010EE667EEFCA15244A24DD14CEBE583F65C6A7EBA2E54015C71E974CE2E2DDE55966E96DF451E01BB5A50D',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       innerTransactions: [Array],
       cosignatures: [Array] },
     LockFundsTransaction {
       type: 16712,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '70CAFABF2DECBBFD2AC05C627D970BD55542F0F5D3CAB16DD191C33DD6BE2DD458716C82E34EA009E30F94BF329829B10B75F1F6426751403057398A31111F0A',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       mosaic: [Mosaic],
       duration: [UInt64],
       hash:
        'AD5CF560AE6A7993D0524EF766E220E7570F6BAE11F4D6C64A3D2036A670C02B' },
     TransferTransaction {
       type: 16724,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        'AE8A849CBB33A15989BA93C83D0A1254CCEC84F31FB043E77D015F97E02C481E84CF223DA160EE8D668C084AD83120307E26D85CF106C5C0DF75FFC51CC50200',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       recipient: [Address],
       mosaics: [Array],
       message: [PlainMessage] },
     AggregateTransaction {
       type: 16705,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '5BA85768764CFFEB19B2641DB5D2E28A244BE78604602DD45DBE1ECBF57A491CC472F4E7F2A611ECDE3D349526D49E57D2A273DA2A71D63EB7C9FF476D5A560D',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       innerTransactions: [Array],
       cosignatures: [] },
     SecretProofTransaction {
       type: 16978,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '73E6840755C132F1EBFF7DC6040EAA0903F6F73AF657201A092F4ECA2DEADE8759F0F1554E4D27F16FE23CC01FF94A3F018879901D72BE76AD2DE9589D0E4904',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       hashType: 0,
       secret:
        '53911BA20016A8C927EEDC50E456E76F2F84C5BEABACB9ADF224E23B964D8573',
       recipient: '9093BBB2C844D33E8D05CE150D7EA34630A056E800189B795A',
       proof:
        '414C4C5F594F55525F424153455F4152455F42454C4F4E475F544F5F5553' },
     SecretLockTransaction {
       type: 16722,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        'FA800AF3C510EC842526F1EDB64964010A80F5BCF250237B5623ABB904822BE2DF2FC0FD9F813FE3A4B6E09807EB874B1CA5EF7FE7C8694D01DA0C447434A70E',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       mosaic: [Mosaic],
       duration: [UInt64],
       hashType: 0,
       secret:
        '53911BA20016A8C927EEDC50E456E76F2F84C5BEABACB9ADF224E23B964D8573',
       recipient: [Address] },
     ModifyAccountPropertyEntityTypeTransaction {
       type: 17232,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '3C77EB88AF67419D18290AE5F976068A64E213894A10FE881D510A3B484BA1343C705E02497706EE590FB87156F9CF91D36A8CC9A1620BD197D9DDC79B52C607',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       propertyType: undefined,
       modifications: [Array] },
     ModifyAccountPropertyEntityTypeTransaction {
       type: 17232,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '076289FAE8AE9586D683986D1A2B500B352F8729A538C54C56AF43056CED91DEA45EA412A14BFC6089A844B67056D7CAF3ABAD907A68DDDAB4BF96C1FCC3B808',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       propertyType: undefined,
       modifications: [Array] },
     ModifyAccountPropertyMosaicTransaction {
       type: 16976,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '3FB5417781930742AF781E1CD706C83C4BD13241537A46A1DF96D355475CB767E194B5A00353C5C7D9162EF199E35EC069FDED6CABBC9B8074210A4238B9A009',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       propertyType: undefined,
       modifications: [Array] },
     ModifyAccountPropertyMosaicTransaction {
       type: 16976,
       networkType: 144,
       version: 1,
       deadline: [Deadline],
       maxFee: [UInt64],
       signature:
        '8077CEF0701215D2CE6B5887C9DFFA4D11420DEEE7DE408B3FE5414C9C35855B480CDB0B97E158AB2741A2F461D5AAAC8BAA250EE3588AAE6BDC8B1CC6AE920A',
       signer: [PublicAccount],
       transactionInfo: [TransactionInfo],
       propertyType: undefined,
       modifications: [Array] } ],
  unconfirmed: [] }
```

`account`,`incomings`,`outgoings`,`unconfirmed`とキーごとにアカウント情報とトランザクション配列を取得して表示しました。


### コード解説

まずアドレスからアカウント情報を取得しています。

取得してきたアカウント情報から公開鍵を取り出して、トランザクションの取得APIへ渡しています。

今回は受信・送信・未承認に加えてアカウント情報をオブジェクトの形にまとめて`subject`へ流しています。

```javascript
accountHttp.getAccountInfo(address).pipe(
  mergeMap(accountInfo => {
    let observers = [];
    if(address.equals(accountInfo.address)) {
      observers = [
        accountHttp.incomingTransactions(accountInfo.publicAccount),
        accountHttp.outgoingTransactions(accountInfo.publicAccount),
        accountHttp.unconfirmedTransactions(accountInfo.publicAccount),
      ];
    } else {
      observers = [
        of([]),
        of([]),
        of([]),
      ];
    }
    return forkJoin([of(accountInfo)].concat(observers));
  }),
  map(results => {
    const [ account, incomings, outgoings, unconfirmed ] = results;
    return { account, incomings, outgoings, unconfirmed };
  })
).subscribe(
  data => console.log(data)
);
```

公開鍵が取得できなかった場合は、トランザクション配列には空の配列をストリームに流すようにしています。
