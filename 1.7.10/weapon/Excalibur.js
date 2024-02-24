var playerKillList = [ {name: "", killCount: 0} ];

function kills(o) {
  var playerName = o.player.getName();
  var heldItem = o.player.getHeldItem();

  if (heldItem.getDisplayName() === "圣剑") {
    var existingPlayer = findPlayer(playerKillList, playerName);

    if (existingPlayer) {
      existingPlayer.killCount++;
      var lore = [
        "一把虚假的圣剑，杀死敌人后会发出嘲讽",
        "似乎能够能够通过嘲讽不断成长" ,
        "杀敌数: " + existingPlayer.killCount
      ];
      // heldItem.setLore(jsJSONTojavaString(lore));
      heldItem.setLore(lore);
      if (existingPlayer.killCount % 10 === 0) {
        o.player.sendMessage("圣剑，启动！");
        heldItem.setAttribute("generic.attackDamage", existingPlayer.killCount / 10);
      }
    } else {
        var newPlayer = { name: playerName, killCount: 1 };
        playerKillList.push(newPlayer);
    }
  }
}

function findPlayer(array, playerName) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === playerName) {
            return array[i];
        }
    }
    return null;
}

function jsJSONTojavaString(JSONstring) {
  // 创建一个与 JSON 字符串数组长度相同的 Java 字符串数组
  var javaStringArray = Java.to(new Array(JSONstring.length), "java.lang.String[]");
  // 将 JavaScript 字符串数组的元素逐个复制到 Java 字符串数组中
  for (var i = 0; i < JSONstring.length; i++) {
      javaStringArray[i] = JSONstring[i];
  }
  return javaStringArray;
}
