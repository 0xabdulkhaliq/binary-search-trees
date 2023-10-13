import Tree from "./modules/tree"
import { updateInformation } from "./modules/ui"
import { themeSwitchInitializer } from "./modules/themeSwitcher"
import { instantiateActions } from "./modules/button"

themeSwitchInitializer()

const root = new Tree([7, 5, 4, 1, 2, 6, 8, 9, 7, 2, 11, 45, 98, 7147, 890, 45])

root.prettyPrint()
updateInformation(root)
instantiateActions(root)
