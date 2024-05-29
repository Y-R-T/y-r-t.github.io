def read_file_as_list(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
            lines = [line.strip() for line in lines]
        return lines
    except Exception as e:
        return str(e)

def extract(lines_list):
    for index, line in enumerate(lines_list):
        if line == "[HitObjects]":
            obj = lines_list[index+1::]
            break

    res = []
    for line in obj:
        tmp_list = line.split(',')
        if tmp_list[0] == '64':
            key = 0
        if tmp_list[0] == '192':
            key = 1
        if tmp_list[0] == '320':
            key = 2
        if tmp_list[0] == '448':
            key = 3
        res.append([int(tmp_list[2]),key])
    return res

file_path = input("请输入文件路径: ")
lines_list = read_file_as_list(file_path)
if isinstance(lines_list, str):  # 检查是否返回了错误信息
    print(f"读取文件时出错: {lines_list}")
else:
    result = extract(lines_list)
    print(result)
