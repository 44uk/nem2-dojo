# エイリアスリンク

前述したとおり、ネームスペースをモザイクまたはアカウントへリンクすることができます。

- [ネームスペース — NEM Developer Center](https://nemtech.github.io/ja/concepts/namespace.html#alias)

ネームスペースをモザイクへリンクすることで、ネームスペース名によってモザイクを認識することができるようになります。


## エイリアスリンクの用途

ネームスペースはアドレスとモザイクのいずれかに紐付けることができます。

- アドレスに紐づけた場合は、ネームスペース名からアドレスを識別することができます。
- モザイクに紐づけた場合は、ネームスペース名からモザイクを識別することができます。


## ネームスペースをモザイクにリンクする

リンクする前にネームスペース名でモザイクを取得するコードを実行してみましょう。

`namespace/fetch_mosaic_by_alias.js test123`

第一引数にはネームスペース名を渡します。

```shell
$ node namespace/fetch_mosaic_by_alias.js test123
Namespace: test123 (ff87cc82daab0bbf)
Endpoint:  http://localhost:3000/namespace/ff87cc82daab0bbf

Error:  Error: No mosaicId is linked to namespace '3668642751,4287089794'
```

紐付ける前なのでエラーになってしまいました。

`Error:  Error: No mosaicId is linked to namespace '3668642751,4287089794'`というメッセージから、`test123`というネームスペースに紐付いたモザイクが無いことがわかります。

それではネームスペースとモザイクをリンクさせてみましょう。

`aliaslink/alias_mosaic.js test123 6ffb0f4308e810f6`

第一引数にはネームスペース名を渡し、第二引数にはモザイクIDを渡します。

```shell
$ node aliaslink/alias_mosaic.js test123 6ffb0f4308e810f6
Initiator: SAFPLK-SQJTYG-TWKNJ6-B66LJV-3VRBMU-SBQH7Y-6ZH4
Endpoint:  http://localhost:3000/account/SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4
Namespace: test123
Endpoint:  http://localhost:3000/namespace/ff87cc82daab0bbf
MosaicHex: 6ffb0f4308e810f6
Endpoint:  http://localhost:3000/mosaic/6ffb0f4308e810f6

connection open
[Transaction announced]
Endpoint: http://localhost:3000/transaction/6FD5536ACC22A1C5E0AC44D778C4052E54603342E78ABE681DE48563E1ABD16A
Hash:     6FD5536ACC22A1C5E0AC44D778C4052E54603342E78ABE681DE48563E1ABD16A
Signer:   A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0

[UNCONFIRMED] SAFPLK...
{"transaction":{"type":17230,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4065705116,23],"signature":"203139A29C9ED3EADEBDAB4FFE958F8346309E9B486B1C3FD970844C12AAF04FDE96BC920B6F18887A37E87828505FCA618086CC62424D66AC7936EE419BAC0D","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","namespaceId":{"id":[3668642751,4287089794],"fullName":""},"mosaicId":{"id":[149426422,1878724419]}}}

[CONFIRMED] SAFPLK...
{"transaction":{"type":17230,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4065705116,23],"signature":"203139A29C9ED3EADEBDAB4FFE958F8346309E9B486B1C3FD970844C12AAF04FDE96BC920B6F18887A37E87828505FCA618086CC62424D66AC7936EE419BAC0D","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","namespaceId":{"id":[3668642751,4287089794],"fullName":""},"mosaicId":{"id":[149426422,1878724419]}}}
```

承認されたら、再度`namespace/fetch_mosaic_by_alias.js`を実行してみましょう。

```shell
$ node namespace/fetch_mosaic_by_alias.js test123
Namespace: test123 (ff87cc82daab0bbf)
Endpoint:  http://localhost:3000/namespace/ff87cc82daab0bbf

Namespace: test123
MosaicId:  6ffb0f4308e810f6 [149426422, 1878724419]
```

今度は結果を取得できました。


### コード解説

```javascript
const nsId = new NamespaceId(namespace);
const mosId = new MosaicId(mosaicHex);

const aliasTx = MosaicAliasTransaction.create(
  Deadline.create(),
  AliasActionType.Link,
  nsId,
  mosId,
  NetworkType.MIJIN_TEST
);
```

ネームスペースID、モザイクIDを渡して`MosaicAliasTransaction`オブジェクトを作り、これに署名をして発信します。

続いて、ネームスペース名からモザイクIDを取得するコードです。

```javascript
const nsId = new NamespaceId(namespace);
const nsHttp = new NamespaceHttp(url);

console.log('Namespace: %s (%s)', nsId.fullName, nsId.toHex());
console.log('Endpoint:  %s/namespace/%s', url, nsId.toHex());
console.log('');

nsHttp.getLinkedMosaicId(nsId).subscribe(
  data => {
    const mosId = data;
    console.log('Namespace: %s', nsId.fullName);
    console.log('MosaicId:  %s [%s, %s]',
      mosId.id.toHex(),
      mosId.id.lower,
      mosId.id.higher
    );
  },
  err => console.error('Error: ', err)
);
```

ネームスペースIDを作り、それを`NamespaceHttp#getLinkedMosaicId`に渡して取得します。

`NamespaceHttp`はネームスペースのAPIにアクセスするオブジェクトです。

`subscribe`メソッドによって購読を開始するとリクエストが開始され、情報が取得できます。


## ネームスペースをアカウントにリンクする

ネームスペースをモザイクへリンクすることで、ネームスペース名によってモザイクを認識することができるようになります。

リンクする前にネームスペース名でモザイクを取得したり、ネームスペース名を宛先とするコードを実行してみましょう。

以下はモザイクへリンクする場合とほぼ同様のコードのため、結果やコード解説を省きます。

詳しくはコードを実行したり、開いて確認してみてください。


```shell
# ネームスペース`alice`を取得
$ node namespace/register_namespace.js alice

# ネームスペースで取得に失敗することを確認
$ node namespace/fetch_account_by_alias.js alice

# ネームスペースをアカウントへリンク
$ node aliaslink/alias_account.js alice SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4

# 取得できることを確認
$ node namespace/fetch_account_by_alias.js alice
Namespace: alice (9cf66fb0cfeed2e0)
Endpoint:  http://localhost:3000/namespace/9cf66fb0cfeed2e0

Namespace: alice
Address:   SAFPLK-SQJTYG-TWKNJ6-B66LJV-3VRBMU-SBQH7Y-6ZH4

# ネームスペース名でモザイクを送信できることを確認
$ node transfer/create_mosaic_transfer_by_namespace.js alice 10
```


## ネームスペースをリンクさせたモザイクをアトミックに作成する

サブネームスペースをアグリゲートトランザクションで取得したように、この一連の作業もアトミックにできます。

`mosaic/create_named_mosaic_with_supply.js`を実行してください。

このスクリプトは第一引数に取得したいネームスペース名を渡し、第二引数でモザイク供給量を指定します。

第三引数でレンタル期間を指定できます。(ない場合は100ブロック)

コードの内容はこれまでのコードをつなぎ合わせて、アグリゲートトランザクションでまとめたものです。

中を確認してみてください。

```shell
$ node mosaic/create_named_mosaic_with_supply.js qwe.rty.uio 3000
Initiator: SAFPLK-SQJTYG-TWKNJ6-B66LJV-3VRBMU-SBQH7Y-6ZH4
Endpoint:  http://localhost:3000/account/SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4
Blocks:    100
Namespace: qwe (c90688e2b544bece)
Endpoint:  http://localhost:3000/namespace/c90688e2b544bece
Namespace: qwe.rty (9649d4770e5f1143)
Endpoint:  http://localhost:3000/namespace/9649d4770e5f1143
Namespace: qwe.rty.uio (c994422e6a5c5dc3)
Endpoint:  http://localhost:3000/namespace/c994422e6a5c5dc3

Mosaic Nonce: 132,195,211,237
Mosaic Hex:   0b6f0121afd85ffc
Supply:       3000
Endpoint:     http://localhost:3000/mosaic/0b6f0121afd85ffc

Txes Len:  6

connection open
[Transaction announced]
Endpoint: http://localhost:3000/transaction/DD48F2FD9ADD42EAB683DE404BDDB2A87B2D78C7E5C6BED71B7DE21B0CE3AE57
Hash:     DD48F2FD9ADD42EAB683DE404BDDB2A87B2D78C7E5C6BED71B7DE21B0CE3AE57
Signer:   A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0

[UNCONFIRMED] SAFPLK...
{"transaction":{"type":16705,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","transactions":[{"transaction":{"type":16718,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","namespaceType":0,"namespaceName":"qwe","namespaceId":{"id":[3041181390,3372648674],"fullName":""},"duration":[100,0]}},{"transaction":{"type":16718,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","namespaceType":1,"namespaceName":"rty","namespaceId":{"id":[241111363,2521420919],"fullName":""},"parentId":{"id":[3041181390,3372648674],"fullName":""}}},{"transaction":{"type":16718,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","namespaceType":1,"namespaceName":"uio","namespaceId":{"id":[1784438211,3381936686],"fullName":""},"parentId":{"id":[241111363,2521420919],"fullName":""}}},{"transaction":{"type":16717,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","nonce":3990078340,"mosaicId":{"id":[2950193148,191824161]},"properties":[{"id":0,"value":[3,0]},{"id":1,"value":[0,0]},{"id":2,"value":[100,0]}]}},{"transaction":{"type":16973,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","mosaicId":{"id":[2950193148,191824161]},"direction":1,"delta":[3000,0]}},{"transaction":{"type":17230,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","namespaceId":{"id":[1784438211,3381936686],"fullName":""},"mosaicId":{"id":[2950193148,191824161]}}}],"cosignatures":[]}}

[CONFIRMED] SAFPLK...
{"transaction":{"type":16705,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","transactions":[{"transaction":{"type":16718,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","namespaceType":0,"namespaceName":"qwe","namespaceId":{"id":[3041181390,3372648674],"fullName":""},"duration":[100,0]}},{"transaction":{"type":16718,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","namespaceType":1,"namespaceName":"rty","namespaceId":{"id":[241111363,2521420919],"fullName":""},"parentId":{"id":[3041181390,3372648674],"fullName":""}}},{"transaction":{"type":16718,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","namespaceType":1,"namespaceName":"uio","namespaceId":{"id":[1784438211,3381936686],"fullName":""},"parentId":{"id":[241111363,2521420919],"fullName":""}}},{"transaction":{"type":16717,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","nonce":3990078340,"mosaicId":{"id":[2950193148,191824161]},"properties":[{"id":0,"value":[3,0]},{"id":1,"value":[0,0]},{"id":2,"value":[100,0]}]}},{"transaction":{"type":16973,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","mosaicId":{"id":[2950193148,191824161]},"direction":1,"delta":[3000,0]}},{"transaction":{"type":17230,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4066589420,23],"signature":"752AE85A6B2DF1E352741869AA45F96E821E3D0C34FDDCDAFAB08EC49AF2699F54AE3212168D09441BE9DAC7797DDE3309D5607FCF2411086595FBFB399AA70E","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","namespaceId":{"id":[1784438211,3381936686],"fullName":""},"mosaicId":{"id":[2950193148,191824161]}}}],"cosignatures":[]}}
```

実行後、ネームスペース名でモザイクが取得できるか、モザイクは作成できているかなど確認してみてください。

```shell
$ node namespace/fetch_mosaic_by_alias.js qwe.rty.uio
Namespace: qwe.rty.uio (c994422e6a5c5dc3)
Endpoint:  http://localhost:3000/namespace/c994422e6a5c5dc3

Namespace: qwe.rty.uio
MosaicId:  0b6f0121afd85ffc [2950193148, 191824161]
```

```shell
$ nem2-cli account info --profile alice
Account:        SAFPLK-SQJTYG-TWKNJ6-B66LJV-3VRBMU-SBQH7Y-6ZH4
-------------------------------------------------------

Address:        SAFPLK-SQJTYG-TWKNJ6-B66LJV-3VRBMU-SBQH7Y-6ZH4
at height:      298

PublicKey:      A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0
at height:      382

Importance:     0
at height:      0

Mosaics
3f859f237d36c3ae:       7558
6ffb0f4308e810f6:       10000
0b6f0121afd85ffc:       3000
29c7073f2019365f:       1000
```


## ネームスペースでモザイクを送信する

`transfer/create_mosaic_transfer_by_named_mosaic.js`を実行します。

ネームスペースとリンクさせたモザイクを、ネームスペースの指定によって送信してみます。

`bob`へ`0b6f0121afd85ffc`モザイクを`qwe.rty.uio`ネームスペースから呼び出して送信します。

このスクリプトは第一引数に宛先アドレスを、第二引数にネームスペースを、第三引数に送信量を指定します。

```shell
$ node transfer/create_mosaic_transfer_by_named_mosaic.js SCJ3XMWIITJT5DIFZYKQ27VDIYYKAVXIAAMJW6K2 qwe.rty.uio 10
Initiator: SAFPLK-SQJTYG-TWKNJ6-B66LJV-3VRBMU-SBQH7Y-6ZH4
Endpoint:  http://localhost:3000/account/SAFPLKSQJTYGTWKNJ6B66LJV3VRBMUSBQH7Y6ZH4
Recipient: SCJ3XM-WIITJT-5DIFZY-KQ27VD-IYYKAV-XIAAMJ-W6K2
Endpoint:  http://localhost:3000/account/SCJ3XMWIITJT5DIFZYKQ27VDIYYKAVXIAAMJW6K2
MosaicId:  0b6f0121afd85ffc
Endpoint:  http://localhost:3000/mosaic/0b6f0121afd85ffc

connection open
[Transaction announced]
Endpoint: http://localhost:3000/transaction/231EAB50050FF4EE07E23FAC730BCA03B6D3EB2A3A613A69F70F43BBDBD8F09D
Hash:     231EAB50050FF4EE07E23FAC730BCA03B6D3EB2A3A613A69F70F43BBDBD8F09D
Signer:   A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0

[UNCONFIRMED] SAFPLK...
{"transaction":{"type":16724,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4089036587,23],"signature":"AE8A849CBB33A15989BA93C83D0A1254CCEC84F31FB043E77D015F97E02C481E84CF223DA160EE8D668C084AD83120307E26D85CF106C5C0DF75FFC51CC50200","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","recipient":{"address":"SCJ3XMWIITJT5DIFZYKQ27VDIYYKAVXIAAMJW6K2","networkType":144},"mosaics":[{"amount":[10,0],"id":[1557790320,326653477]}],"message":{"type":0,"payload":"Send 0b6f0121afd85ffc by qwe.rty.uio"}}}

[CONFIRMED] SAFPLK...
{"transaction":{"type":16724,"networkType":144,"version":36865,"maxFee":[0,0],"deadline":[4089036587,23],"signature":"AE8A849CBB33A15989BA93C83D0A1254CCEC84F31FB043E77D015F97E02C481E84CF223DA160EE8D668C084AD83120307E26D85CF106C5C0DF75FFC51CC50200","signer":"A29FE98485D2841C7C68A2B521156EE5D0170FF6AFF2ED3BF4E908500EC083B0","recipient":{"address":"SCJ3XMWIITJT5DIFZYKQ27VDIYYKAVXIAAMJW6K2","networkType":144},"mosaics":[{"amount":[10,0],"id":[1557790320,326653477]}],"message":{"type":0,"payload":"Send 0b6f0121afd85ffc by qwe.rty.uio"}}}
```

`qwe.rty.uio`に紐付いたモザイク(`0b6f0121afd85ffc`)が`bob`へ届いているかを確認してみます。

```shell
$ nem2-cli account info --profile bob
Account:        SCJ3XM-WIITJT-5DIFZY-KQ27VD-IYYKAV-XIAAMJ-W6K2
-------------------------------------------------------

Address:        SCJ3XM-WIITJT-5DIFZY-KQ27VD-IYYKAV-XIAAMJ-W6K2
at height:      382

PublicKey:      97980E89374802B5A0DD63D32A3897496431486E9DB210B00B43A9B41D08550B
at height:      527

Importance:     0
at height:      0

Mosaics
0b6f0121afd85ffc:       10
3f859f237d36c3ae:       14
```


### コード解説

`getLinkedMosaicId`メソッドによってネームスペースに紐付いたモザイクIDオブジェクトが取得していますが、これは標準出力とメッセージへモザイクIDを渡すためです。

送信モザイク配列を作る際に`MosaicId`オブジェクトの代わりに`NamespaceId`オブジェクトを渡すことができます。

送信前にモザイクの情報が必要無ければ取得せずにトランザクションを発信することもできます。

```javascript
nsHttp.getLinkedMosaicId(nsId)
  .subscribe(
    mosaicId => {
      console.log('Initiator: %s', initiator.address.pretty());
      console.log('Endpoint:  %s/account/%s', url, initiator.address.plain());
      console.log('Recipient: %s', recipient.pretty());
      console.log('Endpoint:  %s/account/%s', url, recipient.plain());
      console.log('MosaicId:  %s', mosaicId.toHex());
      console.log('Endpoint:  %s/mosaic/%s', url, mosaicId.toHex());
      console.log('');

      // MosaicIdには直接NamespaceIdオブジェクトを渡せます。
      // 一度モザイクIDを引いているのはモザイクIDを表示するためです。
      const transferTx = TransferTransaction.create(
        Deadline.create(),
        recipient,
        [new Mosaic(nsId, UInt64.fromUint(amount))],
        PlainMessage.create(`Send ${mosaicId.toHex()} by ${nsId.fullName}`),
        NetworkType.MIJIN_TEST
      );
        .
        .
        .
    }
```

それ以外の処理は`transfer/create_mosaic_transfer.js`とほとんど同じです。



