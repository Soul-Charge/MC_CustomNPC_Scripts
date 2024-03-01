var playerKillList = [ {name: "", killCount: 0} ];

function kills(o) {
  var playerName = o.player.getName();
  var heldItem = o.player.getHeldItem();
  var upPerNum = 5; // 击杀数增加多少触发

  if (heldItem.getDisplayName() === "圣剑") {
    var existingPlayer = findPlayer(playerKillList, playerName);

    // 该玩家不是第一次使用，直接将数组内对应玩家的对象的计数增加
    if (existingPlayer != null) {
      existingPlayer.killCount++;
      // 设置物品描述 lore
      setItemLore(heldItem, existingPlayer.killCount);
      // 杀敌数每增加upPerNum，就启动一次，设置伤害
      if (existingPlayer.killCount % upPerNum === 0) {
        o.player.sendMessage("圣剑，启动！");
        heldItem.setAttribute("generic.attackDamage", existingPlayer.killCount / upPerNum);
      }
    } else { // 该玩家第一次使用，击杀数设置为1，名字记录进去，武器添加描述，设置初始伤害
      var newPlayer = { name: playerName, killCount: 1 };
      playerKillList.push(newPlayer);
      setItemLore(heldItem, 1);
      heldItem.setAttribute("generic.attackDamage", 0);
    }
  }
}

// 设置物品的描述(lore)
function setItemLore(item, killCount) {
  var lore = [
    "一把虚假的圣剑，杀死敌人后会发出嘲讽",
    "似乎能够能够通过嘲讽不断成长" ,
    "杀敌数: " + killCount
  ];
  item.setLore(lore);
}

// 查找对象数组内是否已有该玩家名
function findPlayer(array, playerName) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === playerName) {
      return array[i];
    }
  }
  return null;
}