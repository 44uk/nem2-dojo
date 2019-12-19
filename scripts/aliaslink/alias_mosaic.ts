/**
 * $ node alias/alias_mosaic.js namespaceString mosaicHex
 */
import {
  Account,
  NetworkType,
  MosaicId,
  NamespaceId,
  AliasAction,
  MosaicAliasTransaction,
  Deadline
} from 'nem2-sdk'
import * as util from '../util'
import { env } from '../env'

if(env.PRIVATE_KEY === undefined) {
  throw new Error('You need to be set env variable PRIVATE_KEY')
}
if(env.GENERATION_HASH === undefined) {
  throw new Error('You need to be set env variable GENERATION_HASH')
}

const url = env.API_URL || 'http://localhost:3000'
const initiator = Account.createFromPrivateKey(
  env.PRIVATE_KEY,
  NetworkType.MIJIN_TEST
)

const namespace = process.argv[2]
const mosaicHex = process.argv[3]

const nsId = new NamespaceId(namespace)
const mosId = new MosaicId(mosaicHex)

console.log('Initiator: %s', initiator.address.pretty())
console.log('Endpoint:  %s/account/%s', url, initiator.address.plain())
console.log('Namespace: %s', nsId.fullName)
console.log('Endpoint:  %s/namespace/%s', url, nsId.toHex())
console.log('MosaicHex: %s', mosId.toHex())
console.log('Endpoint:  %s/mosaic/%s', url, mosId.toHex())
console.log('')

const aliasTx = MosaicAliasTransaction.create(
  Deadline.create(),
  AliasAction.Link,
  nsId,
  mosId,
  NetworkType.MIJIN_TEST
)

const signedTx = initiator.sign(aliasTx, env.GENERATION_HASH)

util.listener(url, initiator.address, {
  onOpen: () => {
    util.announce(url, signedTx)
  },
  onConfirmed: (listener) => listener.close()
})