/**
 * $ node transfer/create_encrypted_message_transfer.js MESSAGE
 */
import {
  Account,
  NetworkType,
  TransferTransaction,
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
const plainText = process.argv[3]

// 確認用の情報を出力
console.log('Initiator: %s', initiator.address.pretty())
console.log('Recipient: %s', initiator.address.pretty())
console.log('Endpoint:  %s/account/%s', url, initiator.address.plain())
console.log('Message:   %s', plainText)
console.log('')

const encryptedMessage = initiator.encryptMessage(plainText, initiator.publicAccount, NetworkType.MIJIN_TEST)

const transferTx = TransferTransaction.create(
  Deadline.create(),
  initiator.address,
  [],
  encryptedMessage,
  NetworkType.MIJIN_TEST
)

const signedTx = initiator.sign(transferTx, env.GENERATION_HASH)

util.listener(url, initiator.address, {
  onOpen: () => {
    util.announce(url, signedTx)
  }
})