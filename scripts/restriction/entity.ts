/**
 * $ node filter/entity.js type block add
 */
import {
  Account,
  NetworkType,
  PropertyType,
  TransactionType,
  PropertyModificationType,
  AccountPropertyTransaction,
  AccountPropertyModification,
  Deadline
} from "nem2-sdk"
import * as util from "../util/util"
import { env } from "../util/env"

const url = env.API_URL
const initiator = Account.createFromPrivateKey(
  env.PRIVATE_KEY,
  env.NETWORK_TYPE
)

const entType = process.argv[2] || "TRANSFER"
const propType = process.argv[3] || "block"
const modType = process.argv[4] || "add"

console.log("Initiator: %s", initiator.address.pretty())
console.log("Endpoint:  %s/account/%s", url, initiator.address.plain())
console.log("Subject:   %s", entType)
console.log("Property:  %s", propType)
console.log("Modify:    %s", modType)
console.log("Endpoint:  %s/account/%s/restrictions", url, initiator.publicKey)
console.log("")

const entityType = TransactionType[entType]

const propertyType = propType === "allow"
  ? PropertyType.AllowTransaction
  : PropertyType.BlockTransaction
const propertyModificationType = modType === "remove"
  ? PropertyModificationType.Remove
  : PropertyModificationType.Add

const entityTypePropertyFilter = AccountPropertyModification.createForEntityType(
  propertyModificationType,
  entityType
)

const propModTx = AccountPropertyTransaction.createEntityTypePropertyModificationTransaction(
  Deadline.create(),
  propertyType,
  [entityTypePropertyFilter],
  env.NETWORK_TYPE
)

util.listener(url, initiator.address, {
  onOpen: () => {
    const signedTx = initiator.sign(propModTx, env.GENERATION_HASH)
    util.announce(url, signedTx)
  },
  onConfirmed: (listener) => listener.close()
})
